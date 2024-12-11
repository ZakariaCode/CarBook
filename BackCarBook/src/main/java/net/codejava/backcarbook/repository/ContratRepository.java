package net.codejava.backcarbook.repository;

import net.codejava.backcarbook.model.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratRepository extends JpaRepository<Contrat,Long> {
}
