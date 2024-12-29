package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.ContratDTO;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.model.Reservation;
import net.codejava.BackCarRental.repository.ContratRepository;
import net.codejava.BackCarRental.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ContratMapper {

    @Autowired
    ContratRepository contratRepository;
    public  Contrat mapToContrat(ContratDTO contratDto) {
     return new Contrat(
             contratDto.getId(),
             contratDto.getDate(),null

     );
    }

    public  ContratDTO mapToContratDTO(Contrat saveContrat) {
        if (saveContrat == null) {
            return null;
        }
        ContratDTO contratDTO = new ContratDTO();
        contratDTO.setId(saveContrat.getId());
        contratDTO.setDate(saveContrat.getDate());

        return contratDTO;
    }
}
