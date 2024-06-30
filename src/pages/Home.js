// import React, { useState } from 'react';
// import CameraView from '../components/CameraView';
// import Cart from '../components/Cart';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import QRCode from 'qrcode.react';
// import './Home.scss';

// const Home = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [showQRCode, setShowQRCode] = useState(false);


//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       navigate('/signin');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };


//   const updateCart = (detectedObjects) => {
//     const itemCounts = detectedObjects.reduce((acc, obj) => {
//       const key = obj.class;
//       if (!acc[key]) {
//         acc[key] = { ...obj, quantity: 0 };
//       }
//       acc[key].quantity += 1;
//       return acc;
//     }, {});

//     setCartItems(Object.values(itemCounts));
//   };

//   const handlePayNow = () => {
//     setShowQRCode(true);
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const totalPrice = calculateTotalPrice();
//   const qrCodeValue = `upi://pay?pa=hutagikarvinuta@okhdfcbank&pn=Vinuta Hutagikar&am=${totalPrice}&cu=INR`;



//   return (
//     <div className="home">
//       <h1>Welcome to the Smart Cart App!</h1>
//       <button onClick={handleSignOut}>Log Out</button>
//       <div className="content">
//         <CameraView updateCart={updateCart} />
//         <Cart items={cartItems} />
//       </div>
//       <button className="pay-now-button" onClick={handlePayNow}>Pay Now</button>
//       {showQRCode && (
//         <div className="qr-code">
//           <QRCode value={qrCodeValue} />
//           <p>Total Price: ₹{totalPrice}</p>
//         </div>
//       )}
//     </div>
//   );
// };
      

// export default Home;


import React, { useState } from 'react';
import CameraView from '../components/CameraView';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { authOrders, dbOrders } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSignOut = async () => {
    try {
      await signOut(authOrders);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateCart = (detectedObjects) => {
    const itemCounts = detectedObjects.reduce((acc, obj) => {
            const key = obj.class;
            if (!acc[key]) {
              acc[key] = { ...obj, quantity: 0 };
            }
            acc[key].quantity += 1;
            return acc;
          }, {});
        const itemArray = Object.values(itemCounts);

        const totalPrice = itemArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setTotalPrice(totalPrice);
    setCartItems(itemArray);
    // setTotalPrice(itemCounts.reduce((sum, item) => sum + item.price * item.quantity, 0));

    // setCartItems(Object.values(itemCounts));
    // setTotalPrice(calculateTotalPrice())
    // setCartItems((prevItems) => {
    //   const updatedItems = [...prevItems];
    //   detectedObjects.forEach((newItem) => {
    //     const existingItemIndex = updatedItems.findIndex(item => item.class === newItem.class);
    //     if (existingItemIndex !== -1) {
    //       updatedItems[existingItemIndex].quantity += 1;
    //     } else {
    //       updatedItems.push({ ...newItem, quantity: 1 });
    //     }
    //   });
    //   setTotalPrice(updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    //   return updatedItems;
    // });
  };

  const handlePayNow = async () => {
    try {
      const user = authOrders.currentUser;

      // Store user data and cart items in Firestore
      const orderRef = collection(dbOrders, 'orders');
      const orderDoc = await addDoc(orderRef, {
        userEmail: user.email,
        items: cartItems,
        totalAmount: totalPrice,
        timestamp: new Date(),
      });

      // Redirect to thank you page with order ID
      navigate(`/thankyou/${orderDoc.id}`);
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="home" style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h1>Welcome to the Smart Cart App!</h1>
        <button onClick={handleSignOut}>Log Out</button>
        <CameraView updateCart={updateCart} />
      </div>
      <div style={{ flex: 1 }}>
        <Cart items={cartItems} totalPrice={totalPrice} />
        <button onClick={handlePayNow}>Pay Now</button>
      </div>
    </div>
  );
};

export default Home;
