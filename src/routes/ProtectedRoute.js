import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Authcontext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("Is User Authenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
    console.log('login success');
  }



  return children;
};

export default ProtectedRoute;
