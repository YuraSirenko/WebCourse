import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import UserForm from './pages/UserForm';
import NavBar from './components/NavBar';
import { AuthContext } from './context/AuthContext';
import OrderManager from './components/OrderManager';
import Register from './pages/Register';

const AppRouter = () => {
    console.log('AppRouter rendering, current path:', window.location.pathname);
    const { user } = useContext(AuthContext);
    return (
        <>
            {user && <NavBar />}
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/users" />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/users"
                    element={user ? <UsersList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/users/new"
                    element={user ? <UserForm /> : <Navigate to="/login" />}
                />
                <Route
                    path="/users/:id"
                    element={user ? <UserForm /> : <Navigate to="/login" />}
                />
                <Route
                    path="/orders"
                    element={user ? <OrderManager /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to={user ? '/users' : '/login'} />} />
            </Routes>
        </>
    );
};

export default AppRouter;
