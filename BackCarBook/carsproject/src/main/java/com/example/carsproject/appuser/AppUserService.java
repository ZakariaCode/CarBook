package com.example.carsproject.appuser;

import com.example.carsproject.registration.token.ConfirmationToken;
import com.example.carsproject.registration.token.ConfirmationTokenRepository;
import com.example.carsproject.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.boot.autoconfigure.container.ContainerImageMetadata.isPresent;

@Service
public class AppUserService implements UserDetailsService{
    private final static String USER_NOT_FOUND_MSG="user with email %s not found";
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    public AppUserService(AppUserRepository appUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder
            , ConfirmationTokenService confirmationTokenService) {
        this.appUserRepository = appUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confirmationTokenService = confirmationTokenService;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(()->
                        new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }
    public String signUpUser(utilisateur user){
        boolean userExists =appUserRepository.findByEmail(user.getEmail())
                .isPresent();
        if (userExists){
            throw new IllegalStateException("email already taken");
        }
        String encodedPassword =bCryptPasswordEncoder.
                encode(user.getPassword());
        user.setPassword(encodedPassword);
        appUserRepository.save(user);
        String token=UUID.randomUUID().toString();
        // TODO: Send confirmation token
        ConfirmationToken confirmationToken =new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        // TODO: SEND EMAIL
        return token;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public boolean authenticate(String email, String password) {
        Optional<utilisateur> user = appUserRepository.findByEmail(email);
        // Vérifiez le mot de passe (avec hachage, si applicable)
        return user.filter(utilisateur -> BCrypt.checkpw(password, utilisateur.getPassword())).isPresent();
    }
}
