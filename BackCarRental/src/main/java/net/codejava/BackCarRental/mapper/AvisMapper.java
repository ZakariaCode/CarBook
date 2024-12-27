package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.model.Avis;

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
}
