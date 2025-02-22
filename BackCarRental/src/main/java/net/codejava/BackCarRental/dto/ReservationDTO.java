package net.codejava.BackCarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private Date dateDebut;
    private Date dateFin;
    private Long vehiculeId;
    private Long clientId ;
    private String paiementId;
    private String contratId;

}
