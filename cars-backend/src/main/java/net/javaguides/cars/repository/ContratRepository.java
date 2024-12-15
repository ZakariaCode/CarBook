package net.javaguides.cars.repository;

import net.javaguides.cars.model.Contrat;
import net.javaguides.cars.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Long> {
}
