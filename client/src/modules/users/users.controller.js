const API_URL = '/users';

const UsersController = {
  getAll: async () => {
    const res = await fetch(API_URL);
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  },
  create: async (user) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return res.json();
  },
  update: async (id, user) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return res.json();
  },
  delete: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  }
};

export default UsersController;
