package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.dto.ReservationDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.ReservationMapper;
import net.codejava.BackCarRental.model.*;
import net.codejava.BackCarRental.repository.*;
import net.codejava.BackCarRental.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl  implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepo;
    @Autowired
    private ReservationMapper reservationMapper;
    @Autowired
    private ContratRepository contratRepository;
    @Autowired
    private ClientRepository clientRepo;
    @Autowired
    private PaiementRepository paiementRepository;
    @Autowired
    private VehiculeRepository vehiculeRepository;

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

    @Override
    public Date getDatePaiementByReservationId(Long reservationId) {
        Paiement paiement=paiementRepository.findById(getReservationById(reservationId).getPaiementId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Paiement non trouvé pour la réservation ID"+reservationId));
        return paiement.getDatePaiement();
    }

    public String getVehiculeByReservationId(Long reservationId){
        Vehicule vehicule= vehiculeRepository.findById(getReservationById(reservationId).getVehiculeId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Vehicule non trouvé pour la réservation ID"+reservationId));
        return vehicule.getMarque()+" "+vehicule.getModele()+" "+vehicule.getAnnee();
    }

    public String getClientByReservationId(Long reservationId){
        Client client= clientRepo.findById(getReservationById(reservationId).getClientId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Client non trouvé pour la réservation ID"+reservationId));
        return client.getNom();
    }
    public Long getTotalReservations(){
        return reservationRepo.getTotalReservations();
    }
    public List<Object[]> getNombreReservationsParMois(int year) {
        return reservationRepo.findNombreReservationsParMois(year);
    }
    public Long countClientsFideles(){
        return reservationRepo.countClientsFideles();
    }
}
