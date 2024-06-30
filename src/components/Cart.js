import React from 'react';
import './Cart.scss';

const Cart = ({ items, totalPrice }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Product Number</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.class}</td>
                <td>${item.price}</td>
                <td>{item.productNumber}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="total-price">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
