package net.javaguides.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.UserRepository;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:58714"})
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserRepository userRepository;
 // Get all users
    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }


    // Register a new user
    @PostMapping("/user")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get user by email
    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return ResponseEntity.ok(user);
    }

    // Update user details
    @PutMapping("/user/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User userDetails) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        user.setFirstname(userDetails.getFirstname());
        user.setLastname(userDetails.getLastname());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole()); // Update role

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user
    @DeleteMapping("/user/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }

    // Login user (without JWT)
    @PostMapping("/user/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findById(user.getEmail())
                .orElse(null);

        Map<String, String> response = new HashMap<>();

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            response.put("message", "Login successful");
            response.put("role", existingUser.getRole()); // Include role in response
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
}
