package net.codejava.backcarbook.mapper;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.model.*;
import net.codejava.backcarbook.repository.ClientRepository;
import net.codejava.backcarbook.repository.ContratRepository;
import net.codejava.backcarbook.repository.PaiementRepository;
import net.codejava.backcarbook.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper
{
    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private ContratRepository contratRepository;
    public  ReservationDTO mapToReservationDTO(Reservation reservation){
        return new ReservationDTO(
                reservation.getId(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                reservation.getMontant(),
                reservation.getVehicule().getId() ,
                null,
               null,
                null
        );
    }
    public  Reservation mapToReservation(ReservationDTO reservationDTO){
        Vehicule vehicule = vehiculeRepository.findById(reservationDTO.getVehiculeId())
                .orElseThrow(() -> new RuntimeException("Vehicule not found with ID: " + reservationDTO.getVehiculeId()));
//        Client client = clientRepository.findById(reservationDTO.getClientId())
//                .orElseThrow(() -> new RuntimeException("Client not found with ID: " + reservationDTO.getClientId()));
//        Paiement paiement = paiementRepository.findById(reservationDTO.getPaiementId())
//                .orElseThrow(() -> new RuntimeException("Paiement not found with ID: " + reservationDTO.getPaiementId()));
//        Contrat contrat = contratRepository.findById(reservationDTO.getContratId())
//                .orElseThrow(() -> new RuntimeException("Contrat not found with ID: " + reservationDTO.getContratId()));
        return new Reservation(
                reservationDTO.getId(),
                reservationDTO.getDateDebut(),
                reservationDTO.getDateFin(),
                reservationDTO.getMontant(),
                vehicule,
                null,
                null,
                null
        );
    }
}
