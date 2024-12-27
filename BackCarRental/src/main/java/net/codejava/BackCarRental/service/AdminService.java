package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.AdminDTO;
import org.springframework.web.multipart.MultipartFile;

public interface AdminService {
    AdminDTO getAdminById();
    AdminDTO updateAdmin(Long adminId, AdminDTO updatedAdmin);
    String uploadImage(Long vehiculeId, MultipartFile file);

}
