package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.ReservationDTO;

import java.util.Date;
import java.util.List;

public interface ReservationService {
    ReservationDTO createReservation(ReservationDTO reservationDto);
    ReservationDTO getReservationById(Long reservationId);
    List<ReservationDTO> getAllReservations();
    ReservationDTO updateReservation(Long reservationId, ReservationDTO updatedReservation);
    void DeleteReservation(Long reservationId);
    Date getDatePaiementByReservationId(Long reservationId);
    String getVehiculeByReservationId(Long reservationId);
    String getClientByReservationId(Long reservationId);
    Long getTotalReservations();
    List<Object[]> getNombreReservationsParMois(int year);
    Long countClientsFideles();
}
