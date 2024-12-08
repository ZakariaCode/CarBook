package net.javaguides.cars.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marque;
    private String modele;
    private String type;
    @Enumerated(EnumType.STRING)
    private StatutVehicule statut;
    private float tarif;
    private int annee;
    private String image;
    @OneToMany(mappedBy = "vehicule")
    private Collection<Reservation> reservations;

}
