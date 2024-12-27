package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.ReservationDTO;
import net.codejava.BackCarRental.model.*;
import net.codejava.BackCarRental.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper
{
    @Autowired
    private ReservationRepository reservationRepo;


    public  ReservationDTO mapToReservationDTO(Reservation reservation){
        return new ReservationDTO(
                reservation.getId(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                reservation.getVehicule().getId() ,
                reservation.getClient() != null ? reservation.getClient().getId() : null,
                reservation.getPaiement() != null ? reservation.getPaiement().getId() : null,  // Paiement.getId() est un String
                reservation.getContrat() != null ? reservation.getContrat().getId() : null
        );
    }
    public  Reservation mapToReservation(ReservationDTO reservationDTO){
        return new Reservation(
                reservationDTO.getId(),
                reservationDTO.getDateDebut(),
                reservationDTO.getDateFin(),
                reservationRepo.findVehiculeById(reservationDTO.getVehiculeId()),
                reservationRepo.findClientById(reservationDTO.getClientId()),
                null,
                null
        );
    }
}
