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
        return reservations.stream().map(reservation ->ReservationMapper.mapToReservationDTO(reservation))
                .collect(Collectors.toList());
    }

    @Override
    public ReservationDTO updateReservation(Long reservationId, ReservationDTO updatedReservation) {
        Reservation reservation= reservationRepo.findById(reservationId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Reservation is not exist"+updatedReservation.getId()));
        Client client= clientRepo.findById(updatedReservation.getClientId())
                .orElseThrow(()->
                        new ResourceNotFoundException("client is not exist"+updatedReservation.getClientId()));
        Vehicule vehicule= vehiculeRepository.findById(updatedReservation.getVehiculeId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Vehicule is not exist"+updatedReservation.getVehiculeId()));
        Paiement paiement= paiementRepository.findById(updatedReservation.getPaiementId())
                .orElseThrow(()->
                        new ResourceNotFoundException("paiement is not exist"+updatedReservation.getPaiementId()));
        Contrat contrat= contratRepository.findById(updatedReservation.getContratId())
                .orElseThrow(()->
                        new ResourceNotFoundException("contrat is not exist"+updatedReservation.getContratId()));
        reservation.setDateDebut(updatedReservation.getDateDebut());
        reservation.setDateFin(updatedReservation.getDateFin());
        reservation.setVehicule(vehicule);
        reservation.setClient(client);
        reservation.setPaiement(paiement);
        reservation.setContrat(contrat);
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
