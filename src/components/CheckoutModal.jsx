// src/components/CheckoutModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

function CheckoutModal({ show, handleClose, cartTotal, handlePaymentSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [validated, setValidated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault(); // Prevenir envío normal
    event.stopPropagation();

    setValidated(true); // Activar estilos de validación de Bootstrap

    if (form.checkValidity() === true) {
      setIsProcessing(true);
      // Simular un pequeño retraso para el "procesamiento"
      setTimeout(() => {
        handlePaymentSubmit(formData); // Llama a la función que genera PDF y limpia
        setIsProcessing(false);
        // Resetear formulario y validación al cerrar (o después de éxito)
        setFormData({ name: '', cardNumber: '', expiryDate: '', cvv: '' });
        setValidated(false);
        // handleClose() se llama dentro de handlePaymentSubmit en App.jsx
      }, 1500); // Simular 1.5 segundos de procesamiento
    }
  };

   // Resetear estado al cerrar modal
   const handleModalClose = () => {
    setFormData({ name: '', cardNumber: '', expiryDate: '', cvv: '' });
    setValidated(false);
    setIsProcessing(false);
    handleClose(); // Llama a la función original de cierre
  };


  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Simulación de Pago</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info">
            Estás en un entorno de simulación. No ingreses datos reales de tarjeta.
          </Alert>
          <h5 className="mb-3">Total a Pagar: ${cartTotal.toFixed(2)}</h5>

          <Form.Group className="mb-3" controlId="checkoutForm.Name">
            <Form.Label>Nombre Completo (como aparece en la tarjeta)</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nombre Apellido"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isProcessing}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingresa tu nombre.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="checkoutForm.CardNumber">
            <Form.Label>Número de Tarjeta</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="**** **** **** ****"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              pattern="\d{13,19}" // Regex simple para longitud de tarjeta
              maxLength="19" // Máximo visual
              disabled={isProcessing}
            />
             <Form.Control.Feedback type="invalid">
              Por favor ingresa un número de tarjeta válido (13-19 dígitos).
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={7}>
              <Form.Group className="mb-3" controlId="checkoutForm.ExpiryDate">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="MM/AA"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  pattern="(0[1-9]|1[0-2])\/\d{2}" // MM/YY format
                  maxLength="5"
                  disabled={isProcessing}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa la fecha en formato MM/AA (ej. 09/25).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="checkoutForm.CVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="***"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  pattern="\d{3,4}" // 3 o 4 dígitos
                  maxLength="4"
                  disabled={isProcessing}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa 3 o 4 dígitos.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button type="submit" variant="success" disabled={isProcessing}>
            {isProcessing ? 'Procesando...' : `Pagar $${cartTotal.toFixed(2)}`}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CheckoutModal;