package net.javaguides.cars.service;

import net.javaguides.cars.dto.AdminDTO;
import org.springframework.web.multipart.MultipartFile;

public interface AdminService {
    AdminDTO getAdminById();
    AdminDTO updateAdmin(Long adminId, AdminDTO updatedAdmin);
    String uploadImage(Long vehiculeId, MultipartFile file);

}
