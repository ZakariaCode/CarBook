package net.codejava.backcarbook.service.Impl;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.exception.ResourceNotFoundException;
import net.codejava.backcarbook.mapper.ReservationMapper;
import net.codejava.backcarbook.model.Reservation;
import net.codejava.backcarbook.repository.ReservationRepository;
import net.codejava.backcarbook.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl  implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepo;
    @Autowired
    private ReservationMapper reservationMapper;

    @Override
    public ReservationDTO createReservation(ReservationDTO reservationDto) {
        Reservation reservation= reservationMapper.mapToReservation(reservationDto);

        List<Reservation> reservations = reservationRepo.findReservationsChauvaucher(
                reservationDto.getId(),
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
    public ReservationDTO updateReservation(Long reservationId, ReservationDTO updatedReservation) {
//        Reservation reservation= reservationRepo.findById(reservationId)
//                .orElseThrow(()->
//                        new ResourceNotFoundException("Reservation is not exist"+reservationId));
//        reservation.setDateDebut(updatedReservation.getDateDebut());
//        reservation.setDateFin(updatedReservation.getDateFin());
//        reservation.setMontant(updatedReservation.getMontant());
//        reservation.setVehicule(updatedReservation.getVehicule());
//        reservation.setClient(updatedReservation.getClient());
//        reservation.setPaiement(updatedReservation.getPaiement());
//        reservation.setContrat(updatedReservation.getContrat());

//        Reservation updateReservationObj=reservationRepo.save(reservation);
//        return ReservationMapper.mapToReservationDTO(updateReservationObj);
        return null ;
    }

    @Override
    public void DeleteReservation(Long reservationId) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("reservation is not exist"+reservationId));
        reservationRepo.delete(reservation);
    }

}
