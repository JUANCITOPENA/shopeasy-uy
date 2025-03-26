// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import jsPDF from 'jspdf';

// Component Imports
import Header from './components/Header';
import ProductList from './components/ProductList';
import QuantityModal from './components/QuantityModal';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

// Styles
import './App.css';

function App() {
  // --- State Variables ---
  const [products, setProducts] = useState([]); // Todos los productos de la API
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados por búsqueda
  const [cart, setCart] = useState(() => {
    // Cargar carrito desde localStorage al inicio
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto para modal cantidad
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // --- API Data Fetching ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicialmente mostrar todos
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar

  // --- Cart Persistence ---
  useEffect(() => {
    // Guardar carrito en localStorage cada vez que cambie
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  // --- Search/Filter Logic ---
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // --- Modal Handlers ---
  const handleShowQuantityModal = useCallback((product) => {
    setSelectedProduct(product);
    setShowQuantityModal(true);
  }, []);

  const handleCloseQuantityModal = () => setShowQuantityModal(false);
  const handleCloseCartModal = () => setShowCartModal(false);
  const handleCloseCheckoutModal = () => setShowCheckoutModal(false);
  const handleShowCart = () => setShowCartModal(true);

  const handleShowCheckout = () => {
    handleCloseCartModal();
    // Solo proceder al checkout si hay items en el carrito
    if (cart.length > 0) {
      setShowCheckoutModal(true);
    } else {
      alert("Tu carrito está vacío."); // O mostrar un mensaje más elegante
    }
  };

  // --- Cart Management ---
  const handleAddToCart = useCallback((productToAdd, quantity) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === productToAdd.id);
      let updatedCart;

      if (existingProductIndex > -1) {
        // Producto ya existe, actualizar cantidad
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        // Producto nuevo, añadir al carrito
        updatedCart = [...prevCart, { ...productToAdd, quantity: quantity }];
      }
      return updatedCart;
    });
    handleCloseQuantityModal(); // Cerrar modal después de añadir
  }, []); // No dependencies needed if using functional update

  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la cantidad es 0 o menos, eliminar el producto
      handleRemoveFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, [handleRemoveFromCart]);

  // --- Checkout & PDF Generation ---
  const generateInvoice = useCallback((paymentData) => {
    const doc = new jsPDF();
    let y = 20; // Posición Y inicial

    // Título
    doc.setFontSize(18);
    doc.text("Factura - ShopEasy UY", 14, y);
    y += 10;

    // Información del Cliente (simulada)
    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, y);
    y += 7;
    doc.text(`Cliente: ${paymentData.name || 'N/A'}`, 14, y);
    y += 7;
    // No mostrar datos de tarjeta en la factura
    y += 10; // Espacio antes de los items

    // Cabeceras de la tabla
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Producto", 14, y);
    doc.text("Cant.", 110, y);
    doc.text("P. Unit.", 130, y);
    doc.text("Subtotal", 160, y);
    doc.setFont(undefined, 'normal');
    y += 7;
    doc.line(14, y - 2, 196, y - 2); // Línea separadora

    // Items del Carrito
    doc.setFontSize(10);
    let totalGeneral = 0;
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      totalGeneral += subtotal;
      // Limitar longitud del título
      const title = item.title.length > 50 ? item.title.substring(0, 47) + "..." : item.title;

      doc.text(title, 14, y);
      doc.text(item.quantity.toString(), 115, y, { align: 'right' });
      doc.text(`$${item.price.toFixed(2)}`, 145, y, { align: 'right' });
      doc.text(`$${subtotal.toFixed(2)}`, 180, y, { align: 'right' });
      y += 6;
      if (y > 270) { // Salto de página si es necesario
          doc.addPage();
          y = 20;
      }
    });

    // Línea antes del total
    doc.line(14, y, 196, y);
    y += 7;

    // Total General
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Total General:", 130, y);
    doc.text(`$${totalGeneral.toFixed(2)}`, 180, y, { align: 'right' });

    // Guardar PDF
    doc.save(`Factura_ShopEasyUY_${Date.now()}.pdf`);

  }, [cart]); // Depende del carrito actual

  const handlePaymentSubmit = useCallback((paymentData) => {
    console.log("Procesando pago simulado con datos:", paymentData);
    // 1. Generar la factura PDF
    generateInvoice(paymentData);

    // 2. Simular éxito y limpiar
    alert("¡Pago simulado exitoso! Se ha generado tu factura.");
    setCart([]); // Vaciar el carrito
    handleCloseCheckoutModal(); // Cerrar modal de checkout

    // 3. Opcional: Redirigir o mostrar mensaje de éxito en la página
  }, [generateInvoice]); // Depende de generateInvoice

  // --- Calculations ---
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // --- Render ---
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header
        cartCount={cartCount}
        onCartClick={handleShowCart}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <Container as="main" className="App-content flex-grow-1 py-4">
        {/* Título de Bienvenida (Opcional) */}
        <h2 className="text-center mb-4">Bienvenido a ShopEasy UY</h2>
        <p className="text-center lead mb-5">Tu tienda online de confianza.</p>

        {/* Sección de Productos */}
        {loading && <p className="text-center">Cargando productos...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && (
          <ProductList
            products={filteredProducts}
            onAddToCartClick={handleShowQuantityModal}
          />
        )}
      </Container>

      <Footer />

      {/* --- Modals --- */}
      {selectedProduct && (
        <QuantityModal
          show={showQuantityModal}
          handleClose={handleCloseQuantityModal}
          product={selectedProduct}
          handleAddToCart={handleAddToCart}
        />
      )}

      <CartModal
        show={showCartModal}
        handleClose={handleCloseCartModal}
        cartItems={cart}
        cartTotal={cartTotal}
        handleRemoveFromCart={handleRemoveFromCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleCheckout={handleShowCheckout}
      />

      <CheckoutModal
        show={showCheckoutModal}
        handleClose={handleCloseCheckoutModal}
        cartTotal={cartTotal}
        handlePaymentSubmit={handlePaymentSubmit}
      />
    </div>
  );
}

export default App;