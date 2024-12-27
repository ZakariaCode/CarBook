package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select count(c) from Client c")
    Long nombres_communaute();
    @Query("select c from Client c where c.Avis is not null")
    List<Client> getAllClientAvis();


}
