package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.*;
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
    Vehicule findVehiculeById(@Param("vehiculeId") Long id);
   @Query("select c from Utilisateur c where c.id= :clientId")
    Client findClientById(@Param("clientId") Long id);
    @Query("select p from Paiement p where p.id= :paiementId")
    Paiement findPaiementById(@Param("paiementId") String id);
    @Query("select c from Contrat c where c.id= :contratId")
    Contrat findContratById(@Param("contratId") String id);


}
