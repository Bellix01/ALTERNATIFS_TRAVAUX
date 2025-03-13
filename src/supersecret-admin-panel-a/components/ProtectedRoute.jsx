import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isLoggedIn = !!localStorage.getItem('authToken'); // Replace with your auth logic
    console.log('dd',localStorage.getItem('authToken'));
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
