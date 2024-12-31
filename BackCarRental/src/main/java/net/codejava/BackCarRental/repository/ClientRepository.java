package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.model.Utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional(readOnly = true)
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select count(c) from Client c")
    Long nombres_communaute();
    @Query("select c from Client c where c.Avis is not null")
    List<Client> getAllClientAvis();
     Optional<Utilisateur> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.enabled = TRUE WHERE u.email = ?1")
    int enableUser(String email);
}
