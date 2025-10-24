// API para consumir el backend de usuarios
// Detecta automáticamente si está en Docker o navegador del host
function getApiUrl() {
  // Si estamos en el navegador del host (localhost:3000), usar el puerto mapeado
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8081/usuarios';
  }
  
  // Si estamos en Docker, usar las variables de entorno
  const API_HOST = import.meta.env.VITE_API_HOST || 'localhost';
  const API_PORT = import.meta.env.VITE_API_PORT || '8080';
  const API_BASE = import.meta.env.VITE_API_BASE || '/usuarios';
  
  return `http://${API_HOST}:${API_PORT}${API_BASE}`;
}

const API_URL = getApiUrl();

export async function getUsuarios() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function crearUsuario(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function actualizarUsuario(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}
