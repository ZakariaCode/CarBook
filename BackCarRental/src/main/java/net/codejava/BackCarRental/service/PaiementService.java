package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.PaiementDTO;

import java.util.List;

public interface PaiementService {
    List<PaiementDTO> getAllPaiements();
    PaiementDTO getPaiementById(Long paiementId);
    PaiementDTO updatePaiement(Long paiementId, PaiementDTO updatedPaiement);
    double getRevenu();
    List<Object[]> getRevenuParMois(int year);
}
