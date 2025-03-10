package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.VehiculeDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VehiculeService {
    VehiculeDTO createVehicule(VehiculeDTO vehiculeDto);
    VehiculeDTO getVehiculeById(Long vehiculeId);
    List<VehiculeDTO> getAllVehicules();
    VehiculeDTO updateVehicule(Long vehiculeId, VehiculeDTO updateVehicule);
    void DeleteVehicule(Long vehiculeId);
    String uploadImage(Long vehiculeId, MultipartFile file);
    Long getTotalVehicles();
    List<VehiculeDTO> popularCars();
}
