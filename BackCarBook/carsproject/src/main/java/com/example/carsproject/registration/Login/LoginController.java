package com.example.carsproject.registration.Login;

import com.example.carsproject.appuser.AppUserRepository;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;

import com.example.carsproject.appuser.AppUserService;
import com.example.carsproject.appuser.utilisateur;

import com.example.carsproject.email.EmailSender;
import com.example.carsproject.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/login")
public class LoginController {

    @Autowired
    private AppUserService appUserService;
    private final EmailSender emailSender;// Service pour gérer les utilisateurs
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordResetTokenService passwordResetTokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AppUserRepository appUserRepository;

    public LoginController(EmailSender emailSender, PasswordResetTokenService passwordResetTokenService, BCryptPasswordEncoder bCryptPasswordEncoder, AppUserRepository appUserRepository) {
        this.emailSender = emailSender;
        this.passwordResetTokenService = passwordResetTokenService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.appUserRepository = appUserRepository;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = appUserService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            // Fetch user details
            utilisateur user = (utilisateur) appUserService.loadUserByUsername(loginRequest.getEmail());

            if (user != null) {
                // Include role in the response
                LoginResponse response = new LoginResponse(
                        "success",
                        "Connexion réussie !",
                        user.getRole().toString() // getRole() returns AppUserRole
                );
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new LoginResponse("error", "Utilisateur introuvable.",""));
            }
        } else {
            // Unauthorized error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("error", "Email ou mot de passe incorrect.",""));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }

        // Simulate finding the user by email
        utilisateur user = (utilisateur) appUserService.loadUserByUsername(email);
        boolean userExists = user != null;// Replace with actual check in your user service/repository
        if (!userExists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Email not found"));
        }

        // Generate a reset token (use JWT or any token generation mechanism)
        String resetToken = passwordResetTokenService.createPasswordResetToken(user);// Replace with your token logic

        // Send email with reset link
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        emailSender.send( email,resetLink);

        return ResponseEntity.ok(Map.of("message", "Password reset email sent"));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        // Vérification du token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);

        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Token invalide ou expiré"));
        }

        // Mise à jour du mot de passe
        utilisateur user = resetToken.getUser();
        user.setPassword(bCryptPasswordEncoder.encode(newPassword)); // Assurez-vous d'utiliser un encodeur
        appUserRepository.save(user);

        // Supprimez le token après l'utilisation
        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès"));
    }


}

