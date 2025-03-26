// src/components/CartModal.jsx
import React from 'react';
import { Modal, Button, ListGroup, Image, Row, Col, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function CartModal({ show, handleClose, cartItems, cartTotal, handleRemoveFromCart, handleUpdateQuantity, handleCheckout }) {

  const handleQtyChange = (itemId, currentQty, change) => {
      const newQty = currentQty + change;
      if (newQty >= 0) { // Allow reducing to 0, which triggers removal in App.jsx
          handleUpdateQuantity(itemId, newQty);
      }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Tu Carrito de Compras</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p className="text-center">Tu carrito está vacío.</p>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex align-items-center">
                <Image src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '15px' }} rounded />
                <div className="flex-grow-1 me-3">
                  <h6 className="mb-0">{item.title}</h6>
                  <small className="text-muted">${item.price.toFixed(2)} c/u</small>
                </div>
                <div className="d-flex align-items-center me-3" style={{minWidth: '120px'}}>
                   <Button
                     variant="outline-secondary"
                     size="sm"
                     onClick={() => handleQtyChange(item.id, item.quantity, -1)}
                     aria-label={`Reducir cantidad de ${item.title}`}
                     className='px-2 py-1'
                   >
                     <FontAwesomeIcon icon={faMinus} />
                   </Button>
                   <FormControl
                     type="number"
                     value={item.quantity}
                     readOnly // Make it read-only visually, control via buttons
                     className="mx-2 text-center px-1"
                     style={{ width: '50px', MozAppearance: 'textfield' }} // Hide spinners
                     aria-label={`Cantidad de ${item.title}`}
                   />
                   <Button
                     variant="outline-secondary"
                     size="sm"
                     onClick={() => handleQtyChange(item.id, item.quantity, 1)}
                     aria-label={`Aumentar cantidad de ${item.title}`}
                     className='px-2 py-1'
                   >
                     <FontAwesomeIcon icon={faPlus} />
                   </Button>
                </div>
                <span className="fw-bold me-3" style={{minWidth: '80px', textAlign:'right'}}>
                   ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveFromCart(item.id)}
                  aria-label={`Eliminar ${item.title} del carrito`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
         <div>
             <span className="fw-bold fs-5">Total: ${cartTotal.toFixed(2)}</span>
         </div>
         <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Seguir Comprando
            </Button>
            <Button variant="success" onClick={handleCheckout} disabled={cartItems.length === 0}>
              Proceder al Pago
            </Button>
         </div>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;