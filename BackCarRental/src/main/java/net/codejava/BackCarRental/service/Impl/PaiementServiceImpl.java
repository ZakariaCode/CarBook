package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.PaiementDTO;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.PaiementMapper;
import net.codejava.BackCarRental.mapper.VehiculeMapper;
import net.codejava.BackCarRental.model.MethodePaiement;
import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.model.Vehicule;
import net.codejava.BackCarRental.repository.PaiementRepository;
import net.codejava.BackCarRental.service.PaiementService;
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
    public PaiementDTO getPaiementById(String paiementId) {
        Paiement paiement= paiementRepository.findById(paiementId)
                .orElseThrow(()->
                        new ResourceNotFoundException("paiement is not exist"+paiementId));
        return PaiementMapper.mapToPaiementDTO(paiement);
    }
    public PaiementDTO updatePaiement(String paiementId, PaiementDTO updatedPaiement){
        Paiement paiement= paiementRepository.findById(paiementId)
                .orElseThrow(()->
                        new ResourceNotFoundException("paiement is not exist"+paiementId));
        paiement.setDatePaiement(updatedPaiement.getDatePaiement());
        paiement.setMontant(updatedPaiement.getMontant());
        paiement.setMethodePaiement(String.valueOf(MethodePaiement.valueOf(updatedPaiement.getMethodePaiement())));
        Paiement updatePaiementObj=paiementRepository.save(paiement);
        return PaiementMapper.mapToPaiementDTO(updatePaiementObj);
    }
    public double getRevenu(){
        return paiementRepository.getRevenu();
    }
    public List<Object[]> getRevenuParMois(int year) {
        return paiementRepository.findRevenuParMois(year);
    }

    @Override
    public PaiementDTO createPaiement(PaiementDTO paiementDto) {
        Paiement paiement= PaiementMapper.mapToPaiement(paiementDto);
        Paiement savePaiement=paiementRepository.save(paiement);
        return PaiementMapper.mapToPaiementDTO(savePaiement);
    }
}
