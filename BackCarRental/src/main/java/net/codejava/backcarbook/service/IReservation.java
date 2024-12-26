package net.codejava.backcarbook.service;

import net.codejava.backcarbook.dto.ReservationDTO;

import java.util.List;

public interface IReservation {
    ReservationDTO createReservation(ReservationDTO reservationDto);
    ReservationDTO getReservationById(Long reservationId);
    List<ReservationDTO> getAllReservations();
    ReservationDTO updateReservation(ReservationDTO updatedReservation);
    void DeleteReservation(Long reservationId);
}
