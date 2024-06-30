import React from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import './App.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authOrders } from './firebaseConfig';
import ThankYou from './pages/ThankYou';


function App() {
  const [user, loading, error] = useAuthState(authOrders);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/thankyou/:orderId" element={<ThankYou />} />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
