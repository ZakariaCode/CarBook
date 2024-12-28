package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.mapper.VehiculeMapper;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.mapper.AvisMapper;
import net.codejava.BackCarRental.model.Vehicule;
import net.codejava.BackCarRental.repository.AvisRepository;
import net.codejava.BackCarRental.service.AvisService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class AvisServiceImp implements AvisService {
    private AvisRepository avisRepository;

    @Override
    public AvisDTO createAvis(AvisDTO avisDTO) {
        Avis avis= AvisMapper.mapToAvis(avisDTO);
        Avis saveAvis=avisRepository.save(avis);
        return AvisMapper.mapToAvisDTO(saveAvis);
    }

    public List<AvisDTO> getAllAvis(){
        List<Avis> avis=avisRepository.findAll();
        return avis.stream().map(av -> AvisMapper.mapToAvisDTO(av))
                .collect(Collectors.toList());
    }

}
