package net.codejava.backcarbook.service;

import net.codejava.backcarbook.dto.VehiculeDTO;

import java.util.List;

public interface VehiculeService {
    VehiculeDTO createVehicule(VehiculeDTO vehiculeDto);
    VehiculeDTO getVehiculeById(Long vehiculeId);
    List<VehiculeDTO> getAllVehicules();
    VehiculeDTO updateVehicule(Long vehiculeId, VehiculeDTO updateVehicule);
    void DeleteVehicule(Long vehiculeId);
}
