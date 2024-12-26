package net.codejava.backcarbook.service.Impl;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.exception.ResourceNotFoundException;
import net.codejava.backcarbook.mapper.ReservationMapper;
import net.codejava.backcarbook.model.Reservation;
import net.codejava.backcarbook.model.Vehicule;
import net.codejava.backcarbook.repository.ReservationRepository;
import net.codejava.backcarbook.service.IReservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl  implements IReservation {
    @Autowired
    private ReservationRepository reservationRepo;
    @Autowired
    private ReservationMapper reservationMapper;

    @Override
    public ReservationDTO createReservation(ReservationDTO reservationDto) {
        Reservation reservation= reservationMapper.mapToReservation(reservationDto);
        List<Reservation> reservations = reservationRepo.findReservationsChauvaucher(
                reservationDto.getVehiculeId(),
                reservationDto.getDateDebut()
        );
        if (!reservations.isEmpty()) {
            throw new IllegalArgumentException("Le véhicule est déjà réservé pour ces dates.");
        }

        Reservation savedReservation=reservationRepo.save(reservation);
        return reservationMapper.mapToReservationDTO(savedReservation);
    }

    @Override
    public ReservationDTO getReservationById(Long reservationId) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("reservation is not exist"+reservationId));
        return reservationMapper.mapToReservationDTO(reservation);
    }

    @Override
    public List<ReservationDTO> getAllReservations() {
        List<Reservation> reservations=reservationRepo.findAll();
        return reservations.stream().map(reservation ->reservationMapper.mapToReservationDTO(reservation))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDTO updateReservation(ReservationDTO updatedReservation) {
        Reservation reservation= reservationRepo.findById(updatedReservation.getId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Reservation is not exist"+updatedReservation.getId()));
        reservation.setDateDebut(updatedReservation.getDateDebut());
        reservation.setDateFin(updatedReservation.getDateFin());
        reservation.setMontant(updatedReservation.getMontant());
        reservation.setVehicule(reservationRepo.findVehiculeById(updatedReservation.getVehiculeId()));
        reservation.setClient(reservationRepo.findClientById(updatedReservation.getClientId()));
        reservation.setPaiement(reservationRepo.findPaiementById(updatedReservation.getPaiementId()));
        reservation.setContrat(reservationRepo.findContratById(updatedReservation.getContratId()) );

        Reservation updateReservationObj=reservationRepo.save(reservation);
        return reservationMapper.mapToReservationDTO(updateReservationObj);
    }

    @Override
    public void DeleteReservation(Long reservationId) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("reservation is not exist"+reservationId));
        reservationRepo.delete(reservation);
    }

}
