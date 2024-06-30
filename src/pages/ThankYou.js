import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dbOrders } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import QRCode from 'qrcode.react';
import './ThankYou.scss';

const ThankYou = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderDoc = await getDoc(doc(dbOrders, 'orders', orderId));
      if (orderDoc.exists()) {
        setOrderDetails(orderDoc.data());
      } else {
        console.error('No such order!');
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <div className="thank-you">
      <h1>Thank You for Your Purchase!</h1>
      {orderDetails && (
        <>
          <div className="order-details">
            <h2>Order Details</h2>
            <ul>
              {orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.class} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total Amount: ${orderDetails.totalAmount}</p>
          </div>
          <div className="qr-code">
            <h2>Scan to Pay  ${orderDetails.totalAmount}</h2>
            <QRCode value={`upi://pay?pa=hutagikarvinuta@okhdfcbank&pn=Vinut Hutagikar&am=${orderDetails.totalAmount}&cu=INR`} />
          </div>
        </>
      )}
      <button onClick={handleHome}>Go to Home</button>
    </div>
  );
};

export default ThankYou;
