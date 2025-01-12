package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.model.ConfirmationToken;
import net.codejava.BackCarRental.model.Utilisateur;
import net.codejava.BackCarRental.repository.AdminConfig;
import net.codejava.BackCarRental.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private static final String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    private AdminConfig adminConfig;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                       ConfirmationTokenService confirmationTokenService,AdminConfig adminConfig) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confirmationTokenService = confirmationTokenService;
        this.adminConfig=adminConfig;

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email.equals(adminConfig.getAdminEmail())) {
            Utilisateur admin = new Utilisateur();
            admin.setEmail(adminConfig.getAdminEmail());
            admin.setRole("Admin");
            return admin;
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(Utilisateur user) {
        boolean userExists = userRepository.findByEmail(user.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("Email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

    public boolean authenticate(String email, String password) {
        if (email.equals(adminConfig.getAdminEmail())) {
            return password.equals(adminConfig.getAdminPassword());
        }
        Optional<Utilisateur> user = userRepository.findByEmail(email);
        return user.filter(u -> bCryptPasswordEncoder.matches(password, u.getPassword())).isPresent();
    }
}
