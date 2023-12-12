package com.backend.backend.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.backend.backend.Class.User;
import com.backend.backend.Repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository repo;

    public void deleteUser(Long id) {
    }

    public Object updateUser(Long id, User user) {
        return null;
    }

    public void createUser(User user) {
        repo.save(user);
    }

    public Object getUserById(Long id) {
        return null;
    }

    public Object listAll() {
        return repo.findAll();
    }

    public User login(String email, String password) {
        List<User> users = repo.findAll();
        User user = users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }

    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }
      
   
}
