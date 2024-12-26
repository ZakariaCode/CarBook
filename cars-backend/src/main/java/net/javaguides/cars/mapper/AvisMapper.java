package net.javaguides.cars.mapper;

import net.javaguides.cars.dto.AvisDTO;
import net.javaguides.cars.dto.ClientDTO;
import net.javaguides.cars.model.Avis;
import net.javaguides.cars.model.Client;
import net.javaguides.cars.model.Reservation;

import java.util.List;
import java.util.stream.Collectors;

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
