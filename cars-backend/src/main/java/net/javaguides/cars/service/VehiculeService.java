package net.javaguides.cars.service;

import net.javaguides.cars.dto.VehiculeDTO;

import java.util.List;

public interface VehiculeService {
    VehiculeDTO createVehicule(VehiculeDTO vehiculeDto);
    VehiculeDTO getVehiculeById(Long vehiculeId);
    List<VehiculeDTO> getAllVehicules();
    VehiculeDTO updateVehicule(Long vehiculeId, VehiculeDTO updateVehicule);
    void DeleteVehicule(Long vehiculeId);
}
