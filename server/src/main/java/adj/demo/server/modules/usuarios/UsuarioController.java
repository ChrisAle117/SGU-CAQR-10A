package adj.demo.server.modules.usuarios;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * POST /usuarios - Crear un nuevo usuario
     * @param usuario el usuario a crear (recibe nombre, correo, teléfono)
     * @param bindingResult resultados de validación
     * @return ResponseEntity con el usuario creado o errores de validación
     */
    @PostMapping
    public ResponseEntity<?> crearUsuario(@Valid @RequestBody Usuario usuario, BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();

        // Verificar errores de validación
        if (bindingResult.hasErrors()) {
            List<String> errores = bindingResult.getFieldErrors()
                    .stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            
            response.put("success", false);
            response.put("message", "Errores de validación");
            response.put("errors", errores);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            Usuario usuarioCreado = usuarioService.crearUsuario(usuario);
            response.put("success", true);
            response.put("message", "Usuario creado exitosamente");
            response.put("data", usuarioCreado);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }
    }

    /**
     * GET /usuarios - Obtener la lista de todos los usuarios
     * @return ResponseEntity con la lista de usuarios
     */
    @GetMapping
    public ResponseEntity<?> obtenerTodosLosUsuarios() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Usuario> usuarios = usuarioService.obtenerTodosLosUsuarios();
            response.put("success", true);
            response.put("message", "Usuarios obtenidos exitosamente");
            response.put("data", usuarios);
            response.put("total", usuarios.size());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener los usuarios: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GET /usuarios/:id - Obtener un solo usuario por ID
     * @param id el ID del usuario
     * @return ResponseEntity con el usuario encontrado o mensaje de error
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<Usuario> usuario = usuarioService.obtenerUsuarioPorId(id);
            
            if (usuario.isPresent()) {
                response.put("success", true);
                response.put("message", "Usuario encontrado");
                response.put("data", usuario.get());
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "Usuario no encontrado con ID: " + id);
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al obtener el usuario: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * PUT /usuarios/:id - Actualizar un usuario
     * @param id el ID del usuario a actualizar
     * @param usuario los nuevos datos del usuario
     * @param bindingResult resultados de validación
     * @return ResponseEntity con el usuario actualizado o errores
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, 
                                             @Valid @RequestBody Usuario usuario, 
                                             BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();

        // Verificar errores de validación
        if (bindingResult.hasErrors()) {
            List<String> errores = bindingResult.getFieldErrors()
                    .stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.toList());
            
            response.put("success", false);
            response.put("message", "Errores de validación");
            response.put("errors", errores);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        try {
            Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, usuario);
            response.put("success", true);
            response.put("message", "Usuario actualizado exitosamente");
            response.put("data", usuarioActualizado);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("no encontrado")) {
                response.put("success", false);
                response.put("message", e.getMessage());
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            } else if (e.getMessage().contains("Ya existe")) {
                response.put("success", false);
                response.put("message", e.getMessage());
                return new ResponseEntity<>(response, HttpStatus.CONFLICT);
            } else {
                response.put("success", false);
                response.put("message", "Error al actualizar el usuario: " + e.getMessage());
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    /**
     * DELETE /usuarios/:id - Borrar un usuario
     * @param id el ID del usuario a eliminar
     * @return ResponseEntity con el resultado de la operación
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            usuarioService.eliminarUsuario(id);
            response.put("success", true);
            response.put("message", "Usuario eliminado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al eliminar el usuario: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}