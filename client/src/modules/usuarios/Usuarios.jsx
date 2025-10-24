import React, { useEffect, useState } from 'react';
import { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from './usuarios.api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    const res = await getUsuarios();
    setUsuarios(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    let res;
    if (editId) {
      res = await actualizarUsuario(editId, form);
    } else {
      res = await crearUsuario(form);
    }
    if (res.success) {
      setSuccess(res.message);
      setForm({ nombre: '', correo: '', telefono: '' });
      setEditId(null);
      fetchUsuarios();
    } else {
      setError(res.message || 'Error');
    }
  };

  const handleEdit = usuario => {
    setForm({ nombre: usuario.nombre, correo: usuario.correo, telefono: usuario.telefono });
    setEditId(usuario.id);
    setSuccess(null);
    setError(null);
  };

  const handleDelete = async id => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      const res = await eliminarUsuario(id);
      if (res.success) {
        setSuccess(res.message);
        fetchUsuarios();
      } else {
        setError(res.message || 'Error');
      }
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Usuarios</h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          <form className="card card-body" onSubmit={handleSubmit}>
            <h5>{editId ? 'Editar usuario' : 'Crear usuario'}</h5>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required maxLength={100} />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" name="correo" className="form-control" value={form.correo} onChange={handleChange} required maxLength={150} />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} required maxLength={20} />
            </div>
            <button type="submit" className="btn btn-primary">{editId ? 'Actualizar' : 'Crear'}</button>
            {editId && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setForm({ nombre: '', correo: '', telefono: '' }); }}>Cancelar</button>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
          </form>
        </div>
        <div className="col-md-6">
          <div className="card card-body">
            <h5>Lista de usuarios</h5>
            {loading ? <div>Cargando...</div> : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length === 0 ? (
                    <tr><td colSpan={4}>Sin usuarios</td></tr>
                  ) : usuarios.map(u => (
                    <tr key={u.id}>
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>{u.telefono}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
