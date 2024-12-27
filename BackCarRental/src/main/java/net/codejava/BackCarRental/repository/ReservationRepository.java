package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
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

}
