package net.javaguides.cars.repository;

import net.javaguides.cars.model.Paiement;
import net.javaguides.cars.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    @Query("SELECT sum(montant) from Paiement")
    double getRevenu();
    @Query("SELECT FUNCTION('MONTH', p.datePaiement) AS mois, SUM(p.montant) AS revenuTotal " +
            "FROM Paiement p " +
            "WHERE FUNCTION('YEAR', p.datePaiement) = :year " +
            "GROUP BY mois " +
            "ORDER BY mois")
    List<Object[]> findRevenuParMois(@Param("year") int year);


}
