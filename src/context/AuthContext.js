import React, { createContext, useState, useEffect } from 'react';
import { loginRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    
    const login = async (credentials) => {
        try {
            const data = await loginRequest(credentials);
            setUser(data);
            navigate('/users');
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Re-throw to let the login component handle it
        }
    };

    const logout = () => {
        // You could show a toast/notification here if you have a notification system
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
