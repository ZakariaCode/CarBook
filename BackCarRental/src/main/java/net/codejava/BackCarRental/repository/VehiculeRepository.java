package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    @Query("SELECT count(v) from Vehicule v")
    Long getTotalVehicules();
    @Query("SELECT v FROM Vehicule v LEFT JOIN v.reservations r GROUP BY v.id ORDER BY COUNT(r) DESC")
    List<Vehicule> popularCars();

}
