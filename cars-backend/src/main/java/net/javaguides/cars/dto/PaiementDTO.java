package net.javaguides.cars.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaiementDTO {
    private Long id;
    private Date datePaiement;
    private String methodePaiement;
    private double montant;
    private Long reservationId;

}
