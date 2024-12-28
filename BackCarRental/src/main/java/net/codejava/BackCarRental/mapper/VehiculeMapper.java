package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.model.StatutVehicule;
import net.codejava.BackCarRental.model.Vehicule;

import java.util.List;
import java.util.stream.Collectors;

public class VehiculeMapper {
    public static VehiculeDTO mapToVehiculeDTO(Vehicule vehicule){
        List<Long> reservationIds = (vehicule.getReservations() != null) ?
                vehicule.getReservations().stream()
                        .map(reservation -> reservation.getId())
                        .collect(Collectors.toList())
                : List.of();
        return new VehiculeDTO(
                vehicule.getId(),
                vehicule.getMarque(),
                vehicule.getModele(),
                vehicule.getType(),
                vehicule.getStatut() != null ? StatutVehicule.valueOf(vehicule.getStatut().name()) : null,
                vehicule.getTarif(),
                vehicule.getCarburant(),
                vehicule.getMatricule(),
                vehicule.getAnnee(),
                vehicule.getImage(),
                reservationIds
        );
    }
    public static Vehicule mapToVehicule(VehiculeDTO vehiculeDTO){
        StatutVehicule statut = vehiculeDTO.getStatut() != null ? StatutVehicule.valueOf(String.valueOf(vehiculeDTO.getStatut())) : null;

        return new Vehicule(
                vehiculeDTO.getId(),
                vehiculeDTO.getMarque(),
                vehiculeDTO.getModele(),
                vehiculeDTO.getType(),
                statut,
                vehiculeDTO.getTarif(),
                vehiculeDTO.getCarburant(),
                vehiculeDTO.getMatricule(),
                vehiculeDTO.getAnnee(),
                vehiculeDTO.getImage(),
                null
        );
    }
}
