package net.javaguides.cars.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.cars.dto.PaiementDTO;
import net.javaguides.cars.exception.ResourceNotFoundException;
import net.javaguides.cars.mapper.PaiementMapper;
import net.javaguides.cars.mapper.VehiculeMapper;
import net.javaguides.cars.model.MethodePaiement;
import net.javaguides.cars.model.Paiement;
import net.javaguides.cars.model.Reservation;
import net.javaguides.cars.model.Vehicule;
import net.javaguides.cars.repository.PaiementRepository;
import net.javaguides.cars.service.PaiementService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PaiementServiceImpl implements PaiementService {
    private PaiementRepository paiementRepository;

    @Override
    public List<PaiementDTO> getAllPaiements() {
        List<Paiement> paiements=paiementRepository.findAll();
        return paiements.stream().map(paiement -> PaiementMapper.mapToPaiementDTO(paiement))
                .collect(Collectors.toList());
    }

    @Override
    public PaiementDTO getPaiementById(Long paiementId) {
        Paiement paiement= paiementRepository.findById(paiementId)
                .orElseThrow(()->
                        new ResourceNotFoundException("paiement is not exist"+paiementId));
        return PaiementMapper.mapToPaiementDTO(paiement);
    }
    public PaiementDTO updatePaiement(Long paiementId, PaiementDTO updatedPaiement){
        Paiement paiement= paiementRepository.findById(paiementId)
                .orElseThrow(()->
                        new ResourceNotFoundException("paiement is not exist"+paiementId));
        paiement.setDatePaiement(updatedPaiement.getDatePaiement());
        paiement.setMontant(updatedPaiement.getMontant());
        paiement.setMethodePaiement(MethodePaiement.valueOf(updatedPaiement.getMethodePaiement()));
        Paiement updatePaiementObj=paiementRepository.save(paiement);
        return PaiementMapper.mapToPaiementDTO(updatePaiementObj);
    }
    public double getRevenu(){
        return paiementRepository.getRevenu();
    }
    public List<Object[]> getRevenuParMois(int year) {
        return paiementRepository.findRevenuParMois(year);
    }
}
