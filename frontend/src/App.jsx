import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}/users`;

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert("Completa todos los campos");
      return;
    }
    try {
      await axios.post(API_URL, form);
      setForm({ name: "", email: "", phone: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Usuarios SGU</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Número de teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit">Agregar usuario</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>
                  <button
                    style={{ background: "#dc3545" }}
                    onClick={() => handleDelete(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay usuarios registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
