package net.javaguides.cars.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.javaguides.cars.model.StatutVehicule;

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
    private String statut;
    private float tarif;
    private int annee;
    private String image;
    private List<Long> reservationIds;





}
