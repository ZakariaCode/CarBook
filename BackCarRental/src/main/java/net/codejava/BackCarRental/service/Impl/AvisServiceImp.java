package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.mapper.AvisMapper;
import net.codejava.BackCarRental.repository.AvisRepository;
import net.codejava.BackCarRental.service.AvisService;

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
