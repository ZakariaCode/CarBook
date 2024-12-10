package net.codejava.backcarbook.service.Impl;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.exception.ResourceNotFoundException;
import net.codejava.backcarbook.mapper.ReservationMapper;
import net.codejava.backcarbook.mapper.VehiculeMapper;
import net.codejava.backcarbook.model.Reservation;
import net.codejava.backcarbook.model.StatutVehicule;
import net.codejava.backcarbook.model.Vehicule;
import net.codejava.backcarbook.repository.ReservationRepo;
import net.codejava.backcarbook.service.ReservationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl  implements ReservationService {
    private ReservationRepo reservationRepo;
    @Override
    public ReservationDTO createReservation(ReservationDTO reservationDto) {
        Reservation reservation= ReservationMapper.mapToReservation(reservationDto);
        Reservation savedReservation=reservationRepo.save(reservation);
        return ReservationMapper.mapToReservationDTO(savedReservation);
    }

    @Override
    public ReservationDTO getReservationById(Long reservationId) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("reservation is not exist"+reservationId));
        return ReservationMapper.mapToReservationDTO(reservation);
    }

    @Override
    public List<ReservationDTO> getAllReservations() {
        List<Reservation> reservations=reservationRepo.findAll();
        return reservations.stream().map(reservation ->ReservationMapper.mapToReservationDTO(reservation))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDTO updateReservation(Long reservationId, ReservationDTO updatedReservation) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Reservation is not exist"+reservationId));
        reservation.setDateDebut(updatedReservation.getDateDebut());
        reservation.setDateFin(updatedReservation.getDateFin());
        reservation.setMontant(updatedReservation.getMontant());
        reservation.setVehicule(updatedReservation.getVehicule());
        reservation.setClient(updatedReservation.getClient());
        reservation.setPaiement(updatedReservation.getPaiement());
        reservation.setContrat(updatedReservation.getContrat());

        Reservation updateReservationObj=reservationRepo.save(reservation);
        return ReservationMapper.mapToReservationDTO(updateReservationObj);
    }

    @Override
    public void DeleteReservation(Long reservationId) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("reservation is not exist"+reservationId));
        reservationRepo.delete(reservation);
    }

}
