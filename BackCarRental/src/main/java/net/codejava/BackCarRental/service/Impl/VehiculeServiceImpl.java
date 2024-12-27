package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.VehiculeMapper;
import net.codejava.BackCarRental.model.StatutVehicule;
import net.codejava.BackCarRental.model.Vehicule;
import net.codejava.BackCarRental.repository.VehiculeRepository;
import net.codejava.BackCarRental.service.IVehicule;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class VehiculeServiceImpl implements IVehicule {
    private VehiculeRepository vehiculeRepository;
    @Override
    public VehiculeDTO createVehicule(VehiculeDTO vehiculeDto) {
        Vehicule vehicule= VehiculeMapper.mapToVehicule(vehiculeDto);
        Vehicule saveVehicule=vehiculeRepository.save(vehicule);
        return VehiculeMapper.mapToVehiculeDTO(saveVehicule);
    }

    @Override
    public VehiculeDTO getVehiculeById(Long vehiculeId) {
        Vehicule vehicule= vehiculeRepository.findById(vehiculeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+vehiculeId));
        return VehiculeMapper.mapToVehiculeDTO(vehicule);
    }

    @Override
    public List<VehiculeDTO> getAllVehicules() {
        List<Vehicule> vehicules=vehiculeRepository.findAll();
        return vehicules.stream().map(vehicule ->VehiculeMapper.mapToVehiculeDTO(vehicule))
                .collect(Collectors.toList());
    }

    @Override
    public VehiculeDTO updateVehicule(Long vehiculeId, VehiculeDTO updateVehicule) {
        Vehicule vehicule= vehiculeRepository.findById(vehiculeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+vehiculeId));
        vehicule.setMarque(updateVehicule.getMarque());
        vehicule.setModele(updateVehicule.getModele());
        vehicule.setType(updateVehicule.getType());
        vehicule.setStatut(StatutVehicule.valueOf(String.valueOf(updateVehicule.getStatut())));
        vehicule.setTarif(updateVehicule.getTarif());
        vehicule.setAnnee(updateVehicule.getAnnee());
        Vehicule updateVehiculeObj=vehiculeRepository.save(vehicule);
        return VehiculeMapper.mapToVehiculeDTO(updateVehiculeObj);
    }

    @Override
    public void DeleteVehicule(Long vehiculeId) {
        Vehicule vehicule= vehiculeRepository.findById(vehiculeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+vehiculeId));
        vehiculeRepository.delete(vehicule);
    }
}