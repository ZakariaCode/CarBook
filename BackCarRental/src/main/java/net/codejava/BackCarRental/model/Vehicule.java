package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String carburant;
    private String matricule;
    private Date annee;
    private String image;
    @OneToMany(mappedBy = "vehicule")
    private Collection<Reservation> reservations;
    public Vehicule(String marque, String modele,String type,StatutVehicule status, float tarif,String carburant,String matricule, Date annee, String image) {
        this.marque = marque;
        this.modele = modele;
        this.type = type;
        this.statut = status;
        this.tarif = tarif;

        this.annee = annee;
        this.carburant = carburant;
        this.matricule = matricule;
        this.image = image;
    }

}
