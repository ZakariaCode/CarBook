package net.javaguides.cars.service;

import net.javaguides.cars.dto.PaiementDTO;
import net.javaguides.cars.dto.ReservationDTO;

import java.util.Date;
import java.util.List;

public interface PaiementService {
    List<PaiementDTO> getAllPaiements();
    PaiementDTO getPaiementById(Long paiementId);
    PaiementDTO updatePaiement(Long paiementId, PaiementDTO updatedPaiement);
    double getRevenu();
    List<Object[]> getRevenuParMois(int year);
}
