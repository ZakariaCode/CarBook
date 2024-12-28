package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.PaiementDTO;
import net.codejava.BackCarRental.model.Paiement;

import java.util.List;

public interface PaiementService {
    List<PaiementDTO> getAllPaiements();
    PaiementDTO getPaiementById(String paiementId);
    PaiementDTO updatePaiement(String paiementId, PaiementDTO updatedPaiement);
    double getRevenu();
    List<Object[]> getRevenuParMois(int year);
    PaiementDTO createPaiement(PaiementDTO paiementDTO);
}
