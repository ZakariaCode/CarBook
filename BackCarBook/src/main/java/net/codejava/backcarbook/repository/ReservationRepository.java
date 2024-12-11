package net.codejava.backcarbook.repository;

import net.codejava.backcarbook.model.Reservation;
import net.codejava.backcarbook.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.vehicule.id = :vehiculeId " +
            "AND (r.dateFin > :dateDebut)")
    List<Reservation> findReservationsChauvaucher(
            @Param("vehiculeId") Long vehiculeId,
            @Param("dateDebut") Date dateDebut
    );
   @Query("SELECT r FROM Vehicule r WHERE r.id= :vehiculeId")
    Vehicule findVehiculeById(Long id);
}
