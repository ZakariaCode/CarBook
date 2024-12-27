package net.codejava.BackCarRental.repository;

import net.codejava.BackCarRental.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query("SELECT a.id FROM Admin a")
    Long getAdminId();
}
