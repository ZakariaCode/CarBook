package net.codejava.backcarbook.mapper;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.dto.VehiculeDTO;
import net.codejava.backcarbook.model.Reservation;
import net.codejava.backcarbook.model.StatutVehicule;
import net.codejava.backcarbook.model.Vehicule;

public class ReservationMapper
{
    public static ReservationDTO mapToReservationDTO(Reservation reservation){
        return new ReservationDTO(
                reservation.getId(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                reservation.getMontant(),
                reservation.getVehicule() ,
                reservation.getClient(),
                reservation.getPaiement(),
                reservation.getContrat()
        );
    }
    public static Reservation mapToReservation(ReservationDTO reservationDTO){
        return new Reservation(
                reservationDTO.getId(),
                reservationDTO.getDateDebut(),
                reservationDTO.getDateFin(),
                reservationDTO.getMontant(),
                reservationDTO.getVehicule(),
                reservationDTO.getClient(),
                reservationDTO.getPaiement(),
                reservationDTO.getContrat()
        );
    }
}
