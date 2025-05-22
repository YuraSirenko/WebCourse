import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../services/orderService';
import { createUser, fetchUsers } from '../services/api';
import { addUser } from '../services/orderService';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirm: '', role: ROLES.GUEST });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (!form.username || !form.password || !form.confirm) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const existing = await fetchUsers();
    if (existing.some(u => u.username.toLowerCase() === form.username.toLowerCase())) {
      setError('Username already exists');
      setIsLoading(false);
      return;
    }

    const createdUser = await createUser({ username: form.username, role: form.role });

    addUser({ name: createdUser.username, role: createdUser.role });
    setIsLoading(false);
    navigate('/users');
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <label htmlFor="role">Role</label>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {[ROLES.GUEST, ROLES.WAITER].map(roleOption => (
            <label key={roleOption} style={{
              flex: 1,
              background: form.role === roleOption ? 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)' : '#f5f5f5',
              color: form.role === roleOption ? '#fff' : '#333',
              border: form.role === roleOption ? '2px solid #1976d2' : '1px solid #ccc',
              borderRadius: 14,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 16,
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: form.role === roleOption ? '0 2px 8px rgba(25, 118, 210, 0.08)' : 'none',
              transition: 'all 0.2s',
            }}>
              <input
                type="radio"
                name="role"
                value={roleOption}
                checked={form.role === roleOption}
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </label>
          ))}
        </div>
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
            {isLoading ? 'Registering...' : 'Register'}
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
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
