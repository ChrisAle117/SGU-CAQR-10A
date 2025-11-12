import React, { useState, useEffect } from 'react';
import UserController from './users.controller';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const response = await UserController.getAllUsers();
        if (response.success) {
            setUsers(response.data);
        } else {
            setMessage(response.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let response;
        if (editingUser) {
            response = await UserController.updateUser(editingUser.id, formData);
        } else {
            response = await UserController.createUser(formData);
        }

        if (response.success) {
            setMessage(response.message);
            setShowModal(false);
            resetForm();
            loadUsers();
        } else {
            setMessage(response.message);
        }
        setLoading(false);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
        });
        setShowModal(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            setLoading(true);
            const response = await UserController.deleteUser(userId);
            if (response.success) {
                setMessage(response.message);
                loadUsers();
            } else {
                setMessage(response.message);
            }
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phone: ''
        });
        setEditingUser(null);
    };

    return (
        <div className="users-wrapper apple-card">
            <div className="users-header apple-card-header">
                <h2 className="apple-section-title">Usuarios</h2>
                <button className="apple-btn" onClick={() => { setShowModal(true); resetForm(); }}>Agregar usuario</button>
            </div>
            {message && <div className="apple-message">{message}</div>}
            <div className="users-list">
                {loading ? (
                    <div className="apple-loading">Cargando...</div>
                ) : (
                    users.length === 0 ? (
                        <div className="apple-empty">No hay usuarios registrados.</div>
                    ) : (
                        users.map(user => (
                            <div key={user.id} className="user-card apple-user-card">
                                <div className="user-info apple-user-info">
                                    <span className="user-name apple-user-name">{user.fullName}</span>
                                    <span className="user-email apple-user-email">{user.email}</span>
                                    <span className="user-phone apple-user-phone">{user.phone}</span>
                                </div>
                                <div className="user-actions apple-user-actions">
                                    <button className="apple-btn edit" onClick={() => handleEdit(user)}>Editar</button>
                                    <button className="apple-btn delete" onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
            {showModal && (
                <div className="apple-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="apple-modal" onClick={e => e.stopPropagation()}>
                        <h3 className="apple-modal-title">{editingUser ? 'Editar usuario' : 'Agregar usuario'}</h3>
                        <form onSubmit={handleSubmit} className="user-form apple-user-form">
                            <input 
                                type="text" 
                                name="fullName" 
                                placeholder="Nombre completo" 
                                value={formData.fullName} 
                                onChange={handleChange} 
                                required 
                                className="apple-input" 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Correo electrónico" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className="apple-input" 
                            />
                            <input 
                                type="text" 
                                name="phone" 
                                placeholder="Teléfono" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                                className="apple-input" 
                            />
                            <div className="form-actions apple-form-actions">
                                <button type="submit" className="apple-btn save" disabled={loading}>
                                    {editingUser ? 'Guardar cambios' : 'Crear usuario'}
                                </button>
                                <button type="button" className="apple-btn cancel" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;