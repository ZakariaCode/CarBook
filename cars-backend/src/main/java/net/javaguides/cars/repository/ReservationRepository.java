package net.javaguides.cars.repository;

import net.javaguides.cars.model.Reservation;
import net.javaguides.cars.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
