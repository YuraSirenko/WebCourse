import React, { createContext, useState, useEffect } from 'react';
import { loginRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { users as mockUsers, ROLES } from '../services/orderService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    }); useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (credentials) => {
        try {
            const found = mockUsers.find(
                u => u.name.toLowerCase() === credentials.username.toLowerCase() && credentials.password === u.name // simple password = name for demo
            );
            if (found) {
                setUser(found);
                navigate('/users');
                return found;
            }
            const data = await loginRequest(credentials);
            setUser(data);
            navigate('/users');
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error; 
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, ROLES }}>
            {children}
        </AuthContext.Provider>
    );
};
