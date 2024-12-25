package net.javaguides.cars.repository;

import net.javaguides.cars.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    @Query("SELECT count(v) from Vehicule v")
    Long getTotalVehicules();

}
