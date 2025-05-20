import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        {/* Wrap AuthProvider inside BrowserRouter so useNavigate works correctly */}
        {/* Serve at root URL */}
        <BrowserRouter basename="/">
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
