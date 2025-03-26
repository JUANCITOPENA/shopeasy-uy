
# 🛍️ ShopEasy UY - Simulación de E-commerce con React

![ShopEasy UY Logo](src/assets/logo.png) <!-- Asegúrate que la ruta sea correcta si mueves el README -->

¡Bienvenido a **ShopEasy UY**! Una moderna interfaz de tienda online desarrollada con React, Vite y Bootstrap. Este proyecto simula las funcionalidades clave de un e-commerce, obteniendo datos de productos de la [FakeStore API](https://fakestoreapi.com/) y ofreciendo una experiencia de compra interactiva del lado del cliente.

---

## ✨ Características Principales

*   **Visualización de Productos:**  browse Carga y muestra productos de forma dinámica desde una API externa.
*   **Diseño Responsivo:** 📱💻 Interfaz adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio) gracias a Bootstrap.
*   **Búsqueda Dinámica:** 🔍 Filtra productos en tiempo real por nombre o categoría mientras escribes.
*   **Carrito de Compras Interactivo:** 🛒
    *   Añade productos con selección de cantidad mediante un modal.
    *   Visualiza los items, cantidades y subtotales en un modal dedicado.
    *   Actualiza cantidades o elimina productos directamente desde el carrito.
    *   Cálculo automático del total.
    *   Indicador visual (contador) en el encabezado.
*   **Persistencia Básica del Carrito:** 💾 Guarda el contenido del carrito en `localStorage` para que no se pierda al recargar la página.
*   **Simulación de Pasarela de Pago:** 💳 Modal con un formulario para introducir datos (ficticios) de pago, incluyendo validación básica.
*   **Generación de Factura PDF:** 📄 Al completar el pago simulado, genera y descarga una factura en formato PDF con los detalles de la compra usando `jsPDF`.
*   **Componentes Reutilizables:** ♻️ Estructura modular basada en componentes React para fácil mantenimiento y escalabilidad.
*   **Estilos Modernos:** ✨ Interfaz limpia con efectos visuales (hover) y uso de iconos (Font Awesome).

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend:**
    *   [React](https://reactjs.org/) (v18+) - Biblioteca principal para la UI.
    *   [Vite](https://vitejs.dev/) - Herramienta de construcción y servidor de desarrollo.
    *   [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) (ES6+) - Lógica de la aplicación.
    *   [HTML5](https://developer.mozilla.org/es/docs/Web/Guide/HTML/HTML5) / [CSS3](https://developer.mozilla.org/es/docs/Web/CSS) - Estructura y estilos base.
*   **Estilos y Componentes UI:**
    *   [Bootstrap](https://getbootstrap.com/) (v5+) - Framework CSS para diseño responsivo y componentes.
    *   [React-Bootstrap](https://react-bootstrap.github.io/) - Componentes Bootstrap adaptados para React.
    *   [Font Awesome](https://fontawesome.com/) - Biblioteca de iconos.
        *   `@fortawesome/fontawesome-svg-core`
        *   `@fortawesome/free-solid-svg-icons`
        *   `@fortawesome/react-fontawesome`
*   **Generación de PDF:**
    *   [jsPDF](https://github.com/parallax/jsPDF) - Librería para crear PDFs en el cliente.
*   **API:**
    *   [FakeStore API](https://fakestoreapi.com/) - Para obtener datos de productos de ejemplo.
*   **Gestión de Paquetes:**
    *   [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

---

## 📂 Estructura del Proyecto

```
shopeasy-uy/
│
├── public/                 # Archivos estáticos públicos
│
├── src/                    # Código fuente principal
│   ├── assets/             # Imágenes, fuentes, etc.
│   │   └── logo.png        # Logo de la tienda
│   │
│   ├── components/         # Componentes reutilizables de React
│   │   ├── CartModal.jsx
│   │   ├── CheckoutModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   └── QuantityModal.jsx
│   │
│   ├── App.css             # Estilos CSS personalizados
│   ├── App.jsx             # Componente principal/raíz
│   ├── index.css           # Estilos CSS globales base
│   └── main.jsx            # Punto de entrada JS (renderiza App)
│
├── .gitignore              # Archivos ignorados por Git
├── index.html              # Plantilla HTML principal
├── package.json            # Metadatos y dependencias
└── vite.config.js          # Configuración de Vite
```

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para tener el proyecto corriendo en tu máquina local:

1.  **Clona o Descarga el Repositorio** (Si lo tienes en un repositorio Git)
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd shopeasy-uy
    ```
    *O si empiezas desde cero:*
    ```bash
    npm create vite@latest ShopEasy_UY --template react
    cd shopeasy-uy # O el nombre que aceptaste
    ```

2.  **Instala las Dependencias:**
    Abre una terminal en la carpeta raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```
    *(Esto instalará React, Vite, Bootstrap, jsPDF, Font Awesome y todas las demás librerías listadas en `package.json`)*

3.  **❗ Importante: Añade el Logo:**
    *   Descarga la imagen del logo desde: `https://cdn-icons-png.freepik.com/256/11181/11181797.png?semt=ais_hybrid`
    *   Crea la carpeta `src/assets/` si no existe.
    *   Guarda la imagen descargada como **`logo.png`** (exactamente ese nombre, en minúsculas) dentro de `src/assets/`.

4.  **Ejecuta el Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Abre la Aplicación:**
    Abre tu navegador web y visita la URL que te indica la terminal (normalmente `http://localhost:5173`).

---

## ⚙️ Cómo Funciona (Resumen)

1.  **Inicio (`main.jsx`):** Importa Bootstrap CSS y renderiza el componente `App` en el `index.html`.
2.  **Componente Principal (`App.jsx`):**
    *   Maneja los estados principales: lista de productos, carrito, término de búsqueda, estado de carga/error, visibilidad de modales.
    *   Usa `useEffect` para buscar productos de la FakeStoreAPI al cargar.
    *   Usa `useEffect` para guardar/cargar el carrito en `localStorage`.
    *   Filtra los productos basándose en el `searchTerm`.
    *   Define funciones (callbacks) para manejar la adición/eliminación/actualización del carrito y la lógica de los modales.
    *   Pasa estados y funciones como *props* a los componentes hijos (`Header`, `ProductList`, `CartModal`, etc.).
    *   Orquesta la generación del PDF llamando a `jsPDF` al confirmar el pago simulado.
3.  **Componentes (`components/`):**
    *   **`Header`:** Muestra la navegación, búsqueda y el icono del carrito con contador.
    *   **`ProductList` y `ProductCard`:** Se encargan de mostrar los productos en una cuadrícula responsiva. `ProductCard` define la apariencia individual de cada producto.
    *   **`QuantityModal`:** Permite al usuario elegir cuántos items de un producto añadir.
    *   **`CartModal`:** Muestra el contenido del carrito, permite modificaciones y proceder al pago.
    *   **`CheckoutModal`:** Simula el formulario de pago y dispara la generación de la factura.
    *   **`Footer`:** Pie de página simple.
4.  **Estilos (`App.css`, `index.css`, Bootstrap):** Bootstrap proporciona la base responsiva y componentes. `App.css` añade personalizaciones y estilos específicos.

---

¡Disfruta explorando y modificando **ShopEasy UY**! 🎉
