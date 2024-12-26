package net.javaguides.cars.mapper;

import net.javaguides.cars.dto.AdminDTO;
import net.javaguides.cars.dto.ClientDTO;
import net.javaguides.cars.model.Admin;
import net.javaguides.cars.model.Client;
import net.javaguides.cars.model.Reservation;

import java.util.List;
import java.util.stream.Collectors;

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
