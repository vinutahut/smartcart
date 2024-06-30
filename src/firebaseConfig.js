import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigInventory = {
  apiKey: "AIzaSyAb8R9GWFTKyffqyVbCEBMHsq4I-doBn7Y",
  authDomain: "smart-cart-sign-up.firebaseapp.com",
  projectId: "smart-cart-sign-up",
  storageBucket: "smart-cart-sign-up.appspot.com",
  messagingSenderId: "411064186344",
  appId: "1:411064186344:web:4193c9acb9f9ab78b7e05d",
  measurementId: "G-FDJD5J5M5Y"
};

// Initialize Firebase
// const appInventory = initializeApp(firebaseConfigInventory);
const appInventory = initializeApp(firebaseConfigInventory, "inventoryApp");

// const analytics = getAnalytics(app);
export const authInventory = getAuth(appInventory);
// Export Firestore instance
export const dbInventory = getFirestore(appInventory);

// second firebase db for sign in and users data

const firebaseConfigOrders = {
  apiKey: "AIzaSyBPI5gNtHZUesmXe0C4J_fBs7P_n4zZgv4",
  authDomain: "smart-cart-orders.firebaseapp.com",
  projectId: "smart-cart-orders",
  storageBucket: "smart-cart-orders.appspot.com",
  messagingSenderId: "1087581861652",
  appId: "1:1087581861652:web:ae1900dd655944f4613401",
  measurementId: "G-B6B11EQT8P"

};

const appOrders = initializeApp(firebaseConfigOrders, "ordersApp");
const dbOrders = getFirestore(appOrders);
const authOrders = getAuth(appOrders);

export { dbOrders, authOrders };


