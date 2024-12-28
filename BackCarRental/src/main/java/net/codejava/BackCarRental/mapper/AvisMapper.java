package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.model.Reservation;
import net.codejava.BackCarRental.model.Vehicule;

public class AvisMapper {
    public static AvisDTO mapToAvisDTO(Avis avis){
        if (avis == null) {
            return null;
        }
        AvisDTO avisDTO = new AvisDTO();
        avisDTO.setId(avis.getId());
        avisDTO.setAvis(avis.getAvis());
        avisDTO.setNbrEtoile(avis.getNbrEtoile());
        avisDTO.setClientId(avis.getClient().getId());

        return avisDTO;
    }

    public static Avis mapToAvis(AvisDTO avisDTO) {
        Avis avis = new Avis();
        if (avis.getClient() == null) {
            avis.setClient(new Client());
        }
        avis.setId(avisDTO.getId());
        avis.setAvis(avisDTO.getAvis());
        avis.setNbrEtoile(avis.getNbrEtoile());
        avis.getClient().setId(avisDTO.getId());
        return avis;
    }
}
