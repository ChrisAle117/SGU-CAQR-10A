package adj.demo.server.modules.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    /**
     * Busca un usuario por su correo electrónico
     * @param correo el correo del usuario
     * @return Optional con el usuario si existe
     */
    Optional<Usuario> findByCorreo(String correo);
    
    /**
     * Verifica si existe un usuario con el correo dado
     * @param correo el correo a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByCorreo(String correo);
    
    /**
     * Verifica si existe un usuario con el correo dado, excluyendo un ID específico
     * Útil para validaciones en actualizaciones
     * @param correo el correo a verificar
     * @param id el ID a excluir de la búsqueda
     * @return true si existe otro usuario con ese correo, false en caso contrario
     */
    boolean existsByCorreoAndIdNot(String correo, Long id);
}