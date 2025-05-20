import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser, createUser, updateUser } from '../services/api';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [formData, setFormData] = useState({ username: '', role: 'user' });
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

        try {
            if (isEdit) {
                await updateUser(id, formData);
            } else {
                await createUser(formData);
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
        <div className="user-form">
            <h2>{isEdit ? 'Edit User' : 'New User'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="role">Role</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default UserForm;
