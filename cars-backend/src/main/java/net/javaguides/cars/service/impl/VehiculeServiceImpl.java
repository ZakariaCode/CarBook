package net.javaguides.cars.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.cars.dto.VehiculeDTO;
import net.javaguides.cars.exception.ResourceNotFoundException;
import net.javaguides.cars.mapper.VehiculeMapper;
import net.javaguides.cars.model.StatutVehicule;
import net.javaguides.cars.model.Vehicule;
import net.javaguides.cars.repository.VehiculeRepository;
import net.javaguides.cars.service.VehiculeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VehiculeServiceImpl implements VehiculeService {
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
        vehicule.setStatut(StatutVehicule.valueOf(updateVehicule.getStatut()));
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
