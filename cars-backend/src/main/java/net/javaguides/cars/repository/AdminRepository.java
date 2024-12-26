package net.javaguides.cars.repository;

import net.javaguides.cars.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query("SELECT a.id FROM Admin a")
    Long getAdminId();
}
