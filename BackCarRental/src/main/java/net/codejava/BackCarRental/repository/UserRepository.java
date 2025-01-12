package net.codejava.backcarrental.repository;

import net.codejava.backcarrental.Model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Utilisateur u SET u.enabled = TRUE WHERE u.email = ?1")
    int enableUser(String email);
}
