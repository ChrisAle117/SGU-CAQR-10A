import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_BASE}/users`;

  // Obtener usuarios
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      setError("No se pudo obtener usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Completa todos los campos");
      return;
    }
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", email: "", phone: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      setError(editId ? "No se pudo actualizar el usuario" : "No se pudo crear el usuario");
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers();
      } catch {
        setError("No se pudo eliminar el usuario");
      }
    }
  };

  // Editar usuario
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, phone: user.phone });
    setEditId(user.id);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setForm({ name: "", email: "", phone: "" });
    setEditId(null);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>SGU - Usuarios</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          type="tel"
          placeholder="Número de teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: 10, borderRadius: 4, background: editId ? "#ffc107" : "#007bff", color: "#fff", border: "none", fontWeight: "bold" }}>
          {editId ? "Actualizar usuario" : "Agregar usuario"}
        </button>
        {editId && (
          <button type="button" onClick={handleCancelEdit} style={{ padding: 10, borderRadius: 4, background: "#6c757d", color: "#fff", border: "none", fontWeight: "bold" }}>
            Cancelar edición
          </button>
        )}
      </form>

      {error && <div style={{ color: "#dc3545", margin: "10px 0", textAlign: "center" }}>{error}</div>}

      <div style={{ marginTop: 30 }}>
        {loading ? (
          <div style={{ textAlign: "center" }}>Cargando usuarios...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Nombre</th>
                <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Correo</th>
                <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Teléfono</th>
                <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ padding: 8 }}>{u.name}</td>
                    <td style={{ padding: 8 }}>{u.email}</td>
                    <td style={{ padding: 8 }}>{u.phone}</td>
                    <td style={{ padding: 8 }}>
                      <button
                        style={{ background: "#ffc107", color: "#fff", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer", marginRight: 6 }}
                        onClick={() => handleEdit(u)}
                      >
                        Editar
                      </button>
                      <button
                        style={{ background: "#dc3545", color: "#fff", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer" }}
                        onClick={() => handleDelete(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: 16 }}>No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
