import React, { useEffect, useState, useContext } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UsersList = () => {
    const { user, ROLES } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            alert('Unable to load users');
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Delete this user?')) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (err) {
                console.error(err);
                alert('Delete failed');
            }
        }
    };

    return (
        <div className="users-list">
            <h2>Users</h2>
            {user && user.role === ROLES.ADMIN && (
                <Link to="/users/new" className="btn">
                    + New User
                </Link>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id || u.username}>
                            <td>{u.username}</td>
                            <td>{u.role}</td>
                            <td>
                                {user && user.role === ROLES.ADMIN && (
                                    <>
                                        <Link to={`/users/${u.id}`} className="btn-sm">
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn-sm btn-danger"
                                            onClick={() => handleDelete(u.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
