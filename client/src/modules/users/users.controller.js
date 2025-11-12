const UserController = {};
const ENV = import.meta.env;

const API_URL = `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

UserController.getAllUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return { success: false, message: 'Error de conexión' };
    }
};

UserController.getUserById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return { success: false, message: 'Error de conexión' };
    }
};

UserController.createUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return { success: false, message: 'Error de conexión' };
    }
};

UserController.updateUser = async (id, userData) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return { success: false, message: 'Error de conexión' };
    }
};

UserController.deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return { success: false, message: 'Error de conexión' };
    }
};

export default UserController;