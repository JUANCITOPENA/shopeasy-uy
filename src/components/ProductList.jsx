// src/components/ProductList.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCartClick }) {
  if (!products || products.length === 0) {
    return <p className="text-center">No se encontraron productos.</p>;
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} onAddToCartClick={onAddToCartClick} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;