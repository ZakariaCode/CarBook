package com.example.carsproject.registration.Login;



public class LoginResponse {
    private String status;
    private String message;
    private String role; // Add role to the response

    public LoginResponse(String status, String message, String role) {
        this.status = status;
        this.message = message;
        this.role = role;
    }

    // Getters and setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
