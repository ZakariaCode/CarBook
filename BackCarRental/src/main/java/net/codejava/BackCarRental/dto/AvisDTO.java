package net.codejava.BackCarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvisDTO {
    private Long id;
    private String Avis ;
    private int nbrEtoile;
    private Long clientId;
}
