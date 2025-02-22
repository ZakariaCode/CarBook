package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data  @NoArgsConstructor @AllArgsConstructor
public class Contrat {
    @Id
    private String id;
    private Date date;
    @OneToOne(mappedBy = "contrat")
    private Reservation reservation;
}
