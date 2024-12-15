package net.javaguides.cars.service;

import net.javaguides.cars.dto.ReservationDTO;
import net.javaguides.cars.model.Paiement;

import java.util.Date;
import java.util.List;

public interface ReservationService {
    ReservationDTO createReservation(ReservationDTO reservationDto);
    ReservationDTO getReservationById(Long reservationId);
    List<ReservationDTO> getAllReservations();
    ReservationDTO updateReservation(Long reservationId, ReservationDTO updatedReservation);
    void DeleteReservation(Long reservationId);
    public Date getDatePaiementByReservationId(Long reservationId);
    public String getVehiculeByReservationId(Long reservationId);
    public String getClientByReservationId(Long reservationId);
}
