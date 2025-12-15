import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (token && storedRole) {
            setUser({ token });
            setRole(storedRole);
        }
        setIsLoading(false);
    }, []);

    const login = (token, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        setUser({ token });
        setRole(userRole);
        // Navigation is handled by the consuming component
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
        setRole(null);
        // Navigation is handled by the consuming component
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
