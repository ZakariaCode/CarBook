package net.codejava.backcarbook.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data  @NoArgsConstructor @AllArgsConstructor
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reglement ;
    private Date date;
    @OneToOne(mappedBy = "contrat")
    private Reservation reservation;
}
