package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.model.StatutVehicule;
import net.codejava.BackCarRental.model.Vehicule;

public class VehiculeMapper {
    public static VehiculeDTO mapToVehiculeDTO(Vehicule vehicule){
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
                null
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
