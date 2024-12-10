package net.codejava.backcarbook.mapper;

import net.codejava.backcarbook.dto.VehiculeDTO;
import net.codejava.backcarbook.model.StatutVehicule;
import net.codejava.backcarbook.model.Vehicule;

public class VehiculeMapper {
    public static VehiculeDTO mapToVehiculeDTO(Vehicule vehicule){
        return new VehiculeDTO(
                vehicule.getId(),
                vehicule.getMarque(),
                vehicule.getModele(),
                vehicule.getType(),
                vehicule.getStatut() != null ? StatutVehicule.valueOf(vehicule.getStatut().name()) : null,
                vehicule.getTarif(),
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
                vehiculeDTO.getAnnee(),
                vehiculeDTO.getImage(),
                null
        );
    }
}
