package net.codejava.BackCarRental.dto;

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
    private String id;
    private Date datePaiement;
    private String methodePaiement;
    private float montant;
    private Long reservationId;
}
