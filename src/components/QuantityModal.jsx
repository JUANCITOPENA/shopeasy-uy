// src/components/QuantityModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';

function QuantityModal({ show, handleClose, product, handleAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity to 1 when the modal is shown for a new product
  useEffect(() => {
    if (show) {
      setQuantity(1);
    }
  }, [show]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Ensure quantity is at least 1
  };

  const handleConfirm = () => {
    if (quantity > 0) {
      handleAddToCart(product, quantity);
    }
    // handleClose is called within handleAddToCart in App.jsx
  };

  if (!product) return null; // Don't render if no product selected

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Cantidad</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image src={product.image} alt={product.title} fluid rounded style={{ maxHeight: '150px', marginBottom: '1rem' }} />
        <h5>{product.title}</h5>
        <p>Precio: ${product.price.toFixed(2)}</p>
        <Form.Group className="mb-3 mx-auto" style={{ maxWidth: '150px' }}>
          <Form.Label htmlFor={`quantity-${product.id}`}>Cantidad:</Form.Label>
          <Form.Control
            id={`quantity-${product.id}`}
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            autoFocus // Focus on the input when modal opens
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={quantity <= 0}>
          Confirmar y Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuantityModal;