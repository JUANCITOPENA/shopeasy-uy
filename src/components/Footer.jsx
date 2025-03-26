// src/components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="App-footer bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">© {currentYear} ShopEasy UY. Todos los derechos reservados.</p>
        {/* Puedes añadir más info o links aquí */}
      </Container>
    </footer>
  );
}

export default Footer;