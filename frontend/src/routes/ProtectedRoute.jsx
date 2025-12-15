import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isAuthenticated, role, isLoading } = useContext(AuthContext);
    const location = useLocation();

    // Show loading while checking auth state
    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-secondary)'
            }}>
                <LoadingSpinner size={50} />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Not logged in – redirect to login with return path
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Logged in but role not permitted – redirect to appropriate dashboard
        if (role === 'user') return <Navigate to="/user" replace />;
        if (role === 'technician') return <Navigate to="/technician" replace />;
        if (role === 'admin') return <Navigate to="/admin" replace />;
        return <Navigate to="/" replace />;
    }

    // Authorized – render children
    return children;
};

export default ProtectedRoute;
