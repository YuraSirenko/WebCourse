import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser, createUser, updateUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ROLES, addUser } from '../services/orderService';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = React.useContext(AuthContext);
    const isEdit = Boolean(id);
    const [formData, setFormData] = useState({ username: '', role: ROLES.GUEST });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            fetchUser(id)
                .then((data) => setFormData({ username: data.username, role: data.role }))
                .catch((err) => {
                    console.error(err);
                    alert('Failed to load user');
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || user.role !== ROLES.ADMIN) {
            alert('Only admin can create users');
            return;
        }
        try {
            if (isEdit) {
                await updateUser(id, formData);
            } else {
                const createdUser = await createUser({ username: formData.username, role: formData.role });
                addUser({ name: createdUser.username, role: createdUser.role });
            }
            navigate('/users');
        } catch (err) {
            console.error(err);
            alert(isEdit ? 'Update failed' : 'Creation failed');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '32px auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(25,118,210,0.08)', padding: 32 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{isEdit ? 'Edit User' : 'Create User'}</h2>
            <label htmlFor="username" style={{ fontWeight: 600, marginBottom: 4 }}>Username</label>
            <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: '1px solid #bdbdbd',
                    marginBottom: 18,
                    fontSize: 16,
                }}
            />
            <label htmlFor="role" style={{ fontWeight: 600, marginBottom: 4 }}>Role</label>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {[ROLES.GUEST, ROLES.WAITER].map(roleOption => (
                    <label key={roleOption} style={{
                        flex: 1,
                        background: formData.role === roleOption ? 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)' : '#f5f5f5',
                        color: formData.role === roleOption ? '#fff' : '#333',
                        border: formData.role === roleOption ? '2px solid #1976d2' : '1px solid #ccc',
                        borderRadius: 14,
                        padding: '10px 0',
                        fontWeight: 600,
                        fontSize: 16,
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: formData.role === roleOption ? '0 2px 8px rgba(25, 118, 210, 0.08)' : 'none',
                        transition: 'all 0.2s',
                    }}>
                        <input
                            type="radio"
                            name="role"
                            value={roleOption}
                            checked={formData.role === roleOption}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                    </label>
                ))}
            </div>
            <button
                type="submit"
                style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 18,
                    padding: '12px 0',
                    fontWeight: 600,
                    fontSize: 18,
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                    cursor: 'pointer',
                    marginTop: 8,
                }}
            >
                {isEdit ? 'Update' : 'Create'} User
            </button>
        </form>
    );
};

export default UserForm;
