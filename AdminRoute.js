// frontend/src/components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AdminRoute;
