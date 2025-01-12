package net.codejava.BackCarRental.controller;

import net.codejava.BackCarRental.model.PasswordResetToken;
import net.codejava.BackCarRental.model.Utilisateur;
import net.codejava.BackCarRental.dto.LoginRequest;
import net.codejava.BackCarRental.dto.LoginResponse;
import net.codejava.BackCarRental.repository.PasswordResetTokenRepository;
import net.codejava.BackCarRental.repository.UserRepository;
import net.codejava.BackCarRental.service.IEmailSender;
import net.codejava.BackCarRental.service.Impl.PasswordResetTokenService;
import net.codejava.BackCarRental.service.Impl.UserService;
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

@RestController
@RequestMapping(path = "api/v1/login")
public class LoginController {

    @Autowired
    private UserService userService;
    private IEmailSender emailSender;
    private PasswordResetTokenRepository passwordResetTokenRepository;
    private PasswordResetTokenService passwordResetTokenService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    public LoginController(IEmailSender emailSender, PasswordResetTokenRepository passwordResetTokenRepository, BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository) {
        this.emailSender = emailSender;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {
            Utilisateur user = (Utilisateur) userService.loadUserByUsername(loginRequest.getEmail());
            if (user != null) {
                LoginResponse response = new LoginResponse(
                        "success",
                        "Connexion réussie !",
                        user.getRole().toString()
                );
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginResponse("error", "Utilisateur introuvable.", ""));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse("error", "Email ou mot de passe incorrect.", ""));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }

        Utilisateur user = (Utilisateur) userService.loadUserByUsername(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Email not found"));
        }

        String resetToken = passwordResetTokenService.createPasswordResetToken(user);
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        emailSender.send(email, resetLink);

        return ResponseEntity.ok(Map.of("message", "Password reset email sent"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        PasswordResetToken resetToken =  passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Token invalide ou expiré"));
        }

        Utilisateur user = resetToken.getUser();
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès"));
    }
}

