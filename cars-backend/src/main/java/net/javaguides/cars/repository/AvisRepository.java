package net.javaguides.cars.repository;

import net.javaguides.cars.model.Avis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AvisRepository extends JpaRepository<Avis,Long> {

}
