package net.javaguides.cars.mapper;

import net.javaguides.cars.dto.ReservationDTO;
import net.javaguides.cars.model.*;

public class ReservationMapper
{
    public static ReservationDTO mapToReservationDTO(Reservation reservation){
        Long clientId = (reservation.getClient() != null) ? reservation.getClient().getId() : null;

        return new ReservationDTO(
                reservation.getId(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                reservation.getVehicule().getId(),
                clientId,
                reservation.getPaiement().getId(),
                reservation.getContrat().getId()
        );
    }
    public static Reservation mapToReservation(ReservationDTO reservationDto) {
        Reservation reservation = new Reservation();
        if (reservation.getVehicule() == null) {
            reservation.setVehicule(new Vehicule());
        }
        if (reservation.getClient() == null) {
            reservation.setClient(new Client());
        }
        if (reservation.getPaiement() == null) {
            reservation.setPaiement(new Paiement());
        }
        if (reservation.getContrat() == null) {
            reservation.setContrat(new Contrat());
        }
        reservation.setId(reservationDto.getId());
        reservation.setDateDebut(reservationDto.getDateDebut());
        reservation.setDateFin(reservationDto.getDateFin());
        reservation.getVehicule().setId(reservationDto.getVehiculeId());
        reservation.getClient().setId(reservationDto.getClientId());
        reservation.getPaiement().setId(reservationDto.getPaiementId());
        reservation.getContrat().setId(reservationDto.getContratId());
        return reservation;
    }
}