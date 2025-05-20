import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            logout();
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/users" className="navbar-brand">
                    WebCourse SPA
                </Link>
            </div>
            <div className="navbar-right">
                <span className="navbar-user">
                    Welcome, <strong>{user.username}</strong>
                    <span className="user-badge">{user.role}</span>
                </span>
                <Link to="/users" className="navbar-link">
                    Users
                </Link>
                <Link to="/orders" className="navbar-link">
                    Orders
                </Link>
                <button type="button" onClick={handleLogout} className="navbar-button">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
