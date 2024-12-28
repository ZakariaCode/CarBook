package net.codejava.BackCarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.codejava.BackCarRental.model.StatutVehicule;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehiculeDTO {
    private Long id;
    private String marque;
    private String modele;
    private String type;
    private StatutVehicule statut;
    private float tarif;
    private String carburant;
    private String matricule;
    private int annee;
    private String image;
    private List<Long> reservationIds;

}
