package net.javaguides.springboot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role; // New field for user role

    public User() {
    }

    public User(String email, String firstname, String lastname, String password, String role) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.role = role;
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
