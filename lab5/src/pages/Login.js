import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    }; const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(credentials);
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={credentials.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                />

                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            flex: 2,
                            background: 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 18,
                            padding: '12px 0',
                            fontWeight: 600,
                            fontSize: 18,
                            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s',
                            outline: 'none',
                        }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <button
                        type="button"
                        className="register-button"
                        style={{
                            flex: 1,
                            background: 'linear-gradient(90deg, #2196f3 60%, #64b5f6 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 18,
                            padding: '12px 0',
                            fontWeight: 600,
                            fontSize: 16,
                            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.08)',
                            cursor: 'pointer',
                            marginLeft: 0,
                            outline: 'none',
                        }}
                        onClick={() => window.location.href = '/register'}
                    >
                        Register
                    </button>
                </div>
            </form>
            <div className="login-help">
                <p>Demo accounts:</p>
                <ul>
                    <li>Admin: username <code>admin</code> / password <code>admin</code></li>
                    <li>User: username <code>user1</code> / password <code>password1</code></li>
                </ul>
            </div>
        </div>
    );
};

export default Login;
