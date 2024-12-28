package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.ContratDTO;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.model.Reservation;

public class ContratMapper {

    public static Contrat mapToContrat(ContratDTO contratDto) {
        Contrat contrat = new Contrat();
        if (contrat.getReservation() == null) {
            contrat.setReservation(new Reservation());
        }
        contrat.setId(contratDto.getId());
        contrat.setDate(contratDto.getDate());
        contrat.getReservation().setId(contratDto.getReservationId());
        return contrat;
    }

    public static ContratDTO mapToContratDTO(Contrat saveContrat) {
        if (saveContrat == null) {
            return null;
        }
        ContratDTO contratDTO = new ContratDTO();
        contratDTO.setId(saveContrat.getId());
        contratDTO.setDate(saveContrat.getDate());
        contratDTO.setReservationId(saveContrat.getReservation().getId());

        return contratDTO;
    }
}
