// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, Form, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Asegúrate que la ruta es correcta

function Header({ cartCount, onCartClick, searchTerm, onSearchChange }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="App-header">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="ShopEasy UY Logo"
          />
          ShopEasy UY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            {/* Puedes añadir más links aquí (Categorías, etc.) */}
            {/* <Nav.Link href="#categories">Categorías</Nav.Link> */}
          </Nav>
          <Form className="d-flex mx-lg-3 mb-2 mb-lg-0 flex-grow-1" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="me-2"
              aria-label="Buscar"
              value={searchTerm}
              onChange={onSearchChange}
            />
            {/* Botón de búsqueda opcional si quieres acción al presionar */}
            {/* <Button variant="outline-success">Buscar</Button> */}
          </Form>
          <Button variant="outline-light" onClick={onCartClick} className="position-relative">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="ms-1 d-none d-lg-inline">Carrito</span>
            {cartCount > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.6em' }}
              >
                {cartCount}
                <span className="visually-hidden">productos en el carrito</span>
              </Badge>
            )}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;