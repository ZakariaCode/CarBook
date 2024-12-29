package net.codejava.BackCarRental.mapper;


import net.codejava.BackCarRental.dto.PaiementDTO;
import net.codejava.BackCarRental.model.MethodePaiement;
import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.model.Reservation;

public class PaiementMapper {
    public static PaiementDTO mapToPaiementDTO(Paiement paiement) {
        Long reservationId = (paiement.getReservation() != null) ? paiement.getReservation().getId() : null;
        return new PaiementDTO(
                paiement.getId(),
                paiement.getDatePaiement(),
                paiement.getMethodePaiement(),
                paiement.getMontant(),
                null
        );
    }

    public static Paiement mapToPaiement(PaiementDTO paiementDTO) {
        return new Paiement(
                paiementDTO.getId(),
                paiementDTO.getDatePaiement(),
                paiementDTO.getMontant(),
                paiementDTO.getMethodePaiement(),
                null
        );
    }
}
