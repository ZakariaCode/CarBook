package net.codejava.BackCarRental.mapper;


import net.codejava.BackCarRental.dto.PaiementDTO;
import net.codejava.BackCarRental.model.MethodePaiement;
import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.model.Reservation;

public class PaiementMapper {
    public static PaiementDTO mapToPaiementDTO(Paiement paiement){
        Long reservationId = (paiement.getReservation() != null) ? paiement.getReservation().getId() : null;
        return new PaiementDTO(
                paiement.getId(),
                paiement.getDatePaiement(),
                paiement.getMethodePaiement(),
                paiement.getMontant(),
                reservationId
        );
    }
    public static Paiement mapToPaiement(PaiementDTO paiementDTO){
        Paiement paiement=new Paiement();
        if(paiement.getReservation()==null){
            paiement.setReservation(new Reservation());
        }
        paiement.setId(paiementDTO.getId());
        paiement.setDatePaiement(paiementDTO.getDatePaiement());
        paiement.setMethodePaiement(paiementDTO.getMethodePaiement());
        paiement.setMontant(paiementDTO.getMontant());
        paiement.getReservation().setId(paiementDTO.getReservationId());
        return paiement;
    }
}
