package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.VehiculeDTO;

import java.util.List;

public interface IVehicule {
    VehiculeDTO createVehicule(VehiculeDTO vehiculeDto);
    VehiculeDTO getVehiculeById(Long vehiculeId);
    List<VehiculeDTO> getAllVehicules();
    VehiculeDTO updateVehicule(Long vehiculeId, VehiculeDTO updateVehicule);
    void DeleteVehicule(Long vehiculeId);
}
