package com.example.carsproject.appuser;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
@Transactional(readOnly = true)
public interface AppUserRepository
        extends JpaRepository<utilisateur,Long> {
    Optional<utilisateur> findByEmail(String email);
    @Transactional
    @Modifying
    @Query("UPDATE utilisateur a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);
}
