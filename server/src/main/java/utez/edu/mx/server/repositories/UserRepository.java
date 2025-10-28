package utez.edu.mx.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utez.edu.mx.server.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {}
