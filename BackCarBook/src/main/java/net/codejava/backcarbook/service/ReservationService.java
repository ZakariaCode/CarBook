package net.codejava.backcarbook.service;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.dto.VehiculeDTO;

import java.util.List;

public interface ReservationService {
    ReservationDTO createReservation(ReservationDTO reservationDto);
    ReservationDTO getReservationById(Long reservationId);
    List<ReservationDTO> getAllReservations();
    ReservationDTO updateReservation(Long reservationId, ReservationDTO updatedReservation);
    void DeleteReservation(Long reservationId);
}
