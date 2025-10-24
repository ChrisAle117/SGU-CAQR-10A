package adj.demo.server.modules.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Crear un nuevo usuario
     * @param usuario el usuario a crear
     * @return el usuario creado
     * @throws RuntimeException si ya existe un usuario con ese correo
     */
    public Usuario crearUsuario(Usuario usuario) {
        // Verificar que el correo no esté en uso
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("Ya existe un usuario con el correo: " + usuario.getCorreo());
        }
        return usuarioRepository.save(usuario);
    }

    /**
     * Obtener todos los usuarios
     * @return lista de todos los usuarios
     */
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    /**
     * Obtener un usuario por su ID
     * @param id el ID del usuario
     * @return Optional con el usuario si existe
     */
    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    /**
     * Actualizar un usuario existente
     * @param id el ID del usuario a actualizar
     * @param usuarioActualizado los datos actualizados del usuario
     * @return el usuario actualizado
     * @throws RuntimeException si el usuario no existe o si el correo ya está en uso por otro usuario
     */
    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
        
        if (usuarioExistente.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }

        // Verificar que el correo no esté en uso por otro usuario
        if (usuarioRepository.existsByCorreoAndIdNot(usuarioActualizado.getCorreo(), id)) {
            throw new RuntimeException("Ya existe otro usuario con el correo: " + usuarioActualizado.getCorreo());
        }

        Usuario usuario = usuarioExistente.get();
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setCorreo(usuarioActualizado.getCorreo());
        usuario.setTelefono(usuarioActualizado.getTelefono());

        return usuarioRepository.save(usuario);
    }

    /**
     * Eliminar un usuario por su ID
     * @param id el ID del usuario a eliminar
     * @throws RuntimeException si el usuario no existe
     */
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    /**
     * Verificar si existe un usuario con el ID dado
     * @param id el ID a verificar
     * @return true si existe, false en caso contrario
     */
    public boolean existeUsuario(Long id) {
        return usuarioRepository.existsById(id);
    }
}