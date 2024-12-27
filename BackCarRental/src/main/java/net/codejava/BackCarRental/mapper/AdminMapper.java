package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.AdminDTO;
import net.codejava.BackCarRental.model.Admin;

public class AdminMapper {
    public static AdminDTO mapToAdminDTO(Admin admin){
        if (admin == null) {
            return null;
        }
        AdminDTO adminDTO = new AdminDTO();
        adminDTO.setId(admin.getId());
        adminDTO.setNom(admin.getNom());
        adminDTO.setEmail(admin.getEmail());
        adminDTO.setCIN(admin.getCIN());
        adminDTO.setAdresse(admin.getAdresse());
        adminDTO.setVille(admin.getVille());
        adminDTO.setImage(admin.getImage());
        return adminDTO;
    }
}
