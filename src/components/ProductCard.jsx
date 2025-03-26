// src/components/ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

function ProductCard({ product, onAddToCartClick }) {
  return (
    <Card className="h-100 product-card">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        className="product-card-image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-card-title">{product.title}</Card.Title>
        <Card.Text className="text-muted product-card-category">
          {product.category}
        </Card.Text>
        <Card.Text className="product-card-price mt-auto">
          ${product.price.toFixed(2)}
        </Card.Text>
        <Button
          variant="primary"
          className="mt-2 w-100 product-card-button"
          onClick={() => onAddToCartClick(product)}
        >
          <FontAwesomeIcon icon={faCartPlus} className="me-2" />
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;