package net.codejava.backcarbook.repository;

import net.codejava.backcarbook.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
}
