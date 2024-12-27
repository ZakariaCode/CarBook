package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.ClientDTO;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.model.Reservation;
import net.codejava.BackCarRental.model.StatutVehicule;
import net.codejava.BackCarRental.model.Vehicule;
import net.codejava.BackCarRental.repository.ReservationRepository;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;


public class VehiculeMapper {
    public static VehiculeDTO mapToVehiculeDTO(Vehicule vehicule){
        List<Long> reservationIds = vehicule.getReservations().stream()
                .map(reservation -> reservation.getId())
                .collect(Collectors.toList());
        return new VehiculeDTO(
                vehicule.getId(),
                vehicule.getMarque(),
                vehicule.getModele(),
                vehicule.getType(),
                vehicule.getStatut() != null ? vehicule.getStatut().name() : null,
                vehicule.getTarif(),
                vehicule.getAnnee(),
                vehicule.getImage(),
                reservationIds
        );
    }
    public static Vehicule mapToVehicule(VehiculeDTO vehiculeDTO){
        StatutVehicule statut = vehiculeDTO.getStatut() != null ? StatutVehicule.valueOf(vehiculeDTO.getStatut()) : null;

        return new Vehicule(
                vehiculeDTO.getId(),
                vehiculeDTO.getMarque(),
                vehiculeDTO.getModele(),
                vehiculeDTO.getType(),
                statut,
                vehiculeDTO.getTarif(),
                vehiculeDTO.getAnnee(),
                vehiculeDTO.getImage(),
                null
        );
    }

}
