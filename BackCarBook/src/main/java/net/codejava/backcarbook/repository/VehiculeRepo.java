package net.codejava.backcarbook.repository;

import net.codejava.backcarbook.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculeRepo extends JpaRepository<Vehicule, Long> {
}
