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
    @Query("SELECT count(r) from Reservation r")
    Long getTotalReservations();
    @Query("SELECT MONTH(r.dateDebut) AS mois, COUNT(r) AS nombreReservations " +
            "FROM Reservation r " +
            "WHERE YEAR(r.dateDebut) = :year " +
            "GROUP BY MONTH(r.dateDebut) " +
            "ORDER BY mois")
    List<Object[]> findNombreReservationsParMois(@Param("year") int year);

    @Query("SELECT COUNT(DISTINCT r.client.id) FROM Reservation r")
    Long countClientsFideles();

    @Query("SELECT r FROM Reservation r WHERE r.dateFin < CURRENT_DATE AND r.vehicule.id IN :vehiculeIds")
    List<Reservation> findExpiredReservationsByVehiculeIds(@Param("vehiculeIds") List<Long> vehiculeIds);

}
