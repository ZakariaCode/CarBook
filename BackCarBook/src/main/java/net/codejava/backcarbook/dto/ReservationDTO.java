package net.codejava.backcarbook.dto;

import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.codejava.backcarbook.model.Client;
import net.codejava.backcarbook.model.Contrat;
import net.codejava.backcarbook.model.Paiement;
import net.codejava.backcarbook.model.Vehicule;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private Date dateDebut;
    private Date dateFin;
    private float montant;
    private Long vehiculeId;
    private Long clientId ;
    private Long paiementId;
    private Long contratId;

}
