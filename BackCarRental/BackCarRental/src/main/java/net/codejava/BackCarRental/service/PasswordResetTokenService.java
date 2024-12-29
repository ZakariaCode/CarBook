package net.codejava.BackCarRental.service;


import net.codejava.BackCarRental.Model.PasswordResetToken;
import net.codejava.BackCarRental.repository.PasswordResetTokenRepository;
import net.codejava.BackCarRental.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    public PasswordResetTokenService(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    public String createPasswordResetToken(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(resetToken);
        return token;
    }

    public PasswordResetToken findToken(String token) {
        return passwordResetTokenRepository.findByToken(token);
    }

    public void deleteToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }
}