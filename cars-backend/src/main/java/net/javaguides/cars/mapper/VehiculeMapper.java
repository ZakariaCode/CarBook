package net.javaguides.cars.mapper;

import net.javaguides.cars.dto.VehiculeDTO;
import net.javaguides.cars.model.StatutVehicule;
import net.javaguides.cars.model.Vehicule;
import net.javaguides.cars.model.Reservation;

import java.util.stream.Collectors;

public class VehiculeMapper {
    public static VehiculeDTO mapToVehiculeDTO(Vehicule vehicule){
        return new VehiculeDTO(
                vehicule.getId(),
                vehicule.getMarque(),
                vehicule.getModele(),
                vehicule.getType(),
                vehicule.getStatut() != null ? vehicule.getStatut().name() : null,
                vehicule.getTarif(),
                vehicule.getAnnee(),
                vehicule.getImage(),
                null
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
