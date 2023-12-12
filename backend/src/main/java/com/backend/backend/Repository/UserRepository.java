package com.backend.backend.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.Class.User;

public interface UserRepository extends JpaRepository<User, Integer> {

     Optional<User> findByEmail(String email);
 
}
