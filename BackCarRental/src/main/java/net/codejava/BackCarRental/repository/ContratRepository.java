package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.model.Reservation;
import net.codejava.BackCarRental.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratRepository extends JpaRepository<Contrat,String> {
    @Query("SELECT r FROM Reservation r WHERE r.id= :reservationId")
    Reservation findReservationById(@Param("reservationId") Long id);
}
