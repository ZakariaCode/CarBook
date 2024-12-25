package net.javaguides.cars.mapper;


import net.javaguides.cars.dto.PaiementDTO;
import net.javaguides.cars.model.*;

public class PaiementMapper {
    public static PaiementDTO mapToPaiementDTO(Paiement paiement){
        Long reservationId = (paiement.getReservation() != null) ? paiement.getReservation().getId() : null;
        return new PaiementDTO(
                paiement.getId(),
                paiement.getDatePaiement(),
                paiement.getMethodePaiement()!= null ? paiement.getMethodePaiement().name() : null,
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
        paiement.setMethodePaiement(MethodePaiement.valueOf(paiementDTO.getMethodePaiement()));
        paiement.setMontant(paiementDTO.getMontant());
        paiement.getReservation().setId(paiementDTO.getReservationId());
        return paiement;
    }
}
