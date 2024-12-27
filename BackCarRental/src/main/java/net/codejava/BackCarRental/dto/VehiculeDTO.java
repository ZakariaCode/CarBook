package net.codejava.BackCarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehiculeDTO {
    private Long id;

    private String marque;
    private String modele;
    private String type;
    private String statut;
    private float tarif;
    private int annee;
    private String image;
    private List<Long> reservationIds;





}
