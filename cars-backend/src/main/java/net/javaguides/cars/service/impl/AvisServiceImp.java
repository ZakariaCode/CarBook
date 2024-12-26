package net.javaguides.cars.service.impl;

import net.javaguides.cars.dto.AvisDTO;
import net.javaguides.cars.exception.ResourceNotFoundException;
import net.javaguides.cars.mapper.ClientMapper;
import net.javaguides.cars.model.Avis;
import net.javaguides.cars.mapper.AvisMapper;
import net.javaguides.cars.model.Client;
import net.javaguides.cars.repository.AvisRepository;
import net.javaguides.cars.service.AvisService;

import java.util.List;
import java.util.stream.Collectors;

public class AvisServiceImp implements AvisService {
    private AvisRepository avisRepository;

    public List<AvisDTO> getAllAvis(){
        List<Avis> avis=avisRepository.findAll();
        return avis.stream().map(av -> AvisMapper.mapToAvisDTO(av))
                .collect(Collectors.toList());
    }

}
