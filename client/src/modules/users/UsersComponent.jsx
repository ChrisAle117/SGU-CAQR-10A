import { useEffect, useState } from 'react';
import UsersController from './users.controller';

const initialForm = { fullName: '', email: '', phone: '' };

function UsersComponent() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadUsers = async () => {
    const data = await UsersController.getAll();
    setUsers(data);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await UsersController.update(editingId, form);
    } else {
      await UsersController.create(form);
    }
    setForm(initialForm);
    setEditingId(null);
    loadUsers();
  };

  const handleEdit = user => {
    setForm({ fullName: user.fullName, email: user.email, phone: user.phone });
    setEditingId(user.id);
  };

  const handleDelete = async id => {
    await UsersController.delete(id);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input name="fullName" value={form.fullName} onChange={handleChange} className="form-control" placeholder="Nombre completo" required />
        </div>
        <div className="mb-2">
          <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Correo electrónico" required />
        </div>
        <div className="mb-2">
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Teléfono" required />
        </div>
        <button type="submit" className="btn btn-primary">{editingId ? 'Actualizar' : 'Crear'} usuario</button>
        {editingId && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setForm(initialForm); setEditingId(null); }}>Cancelar</button>}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersComponent;
