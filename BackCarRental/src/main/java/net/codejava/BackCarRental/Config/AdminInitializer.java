package net.codejava.BackCarRental.Config;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.model.Admin;
import net.codejava.BackCarRental.repository.AdminConfig;
import net.codejava.BackCarRental.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AdminInitializer {

    private final AdminRepository adminRepository;
    private final AdminConfig adminConfig;
    private final BCryptPasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initializeAdmin() {
        return args -> {
            // Vérifier si un admin avec cet email existe déjà
            Admin existingAdmin = adminRepository.findByEmail(adminConfig.getAdminEmail()).orElse(null);

            if (existingAdmin == null) {
                // Créer un nouvel administrateur avec les informations du fichier application.properties
                Admin newAdmin = new Admin(
                        "Admin", // Nom par défaut
                        adminConfig.getAdminEmail(),
                        passwordEncoder.encode(adminConfig.getAdminPassword()),
                        "CIN_DEFAULT", // Remplissez avec des valeurs par défaut ou personnalisez
                        "Adresse par défaut",
                        "Ville par défaut",
                        null // Image par défaut
                );

                adminRepository.save(newAdmin);
                System.out.println("Administrateur créé avec succès.");
            } else {
                System.out.println("Administrateur déjà présent dans la base de données.");
            }
        };
    }
}