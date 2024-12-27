package com.example.carsproject.registration.Login;

import com.example.carsproject.appuser.utilisateur;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToOne;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Entity
public class PasswordResetToken {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne
    private utilisateur user;

    private LocalDateTime expiryDate;

    public PasswordResetToken() {
    }


    public String getToken() {
        return token;
    }

    public utilisateur getUser() {
        return user;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }


    public void setToken(String token) {
        this.token = token;
    }

    public void setUser(utilisateur user) {
        this.user = user;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    // Getters et Setters
}
