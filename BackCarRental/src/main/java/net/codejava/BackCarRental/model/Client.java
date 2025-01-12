package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("Client")
public class Client extends Utilisateur {
    public Client(String nom, String email, String password, String CIN, String adresse, String ville, String image) {
        super(nom, email, password, CIN, adresse, ville, image);
    }
    @OneToMany(mappedBy = "client")
    private Collection<Reservation> reservations;
    @OneToOne
    private Avis Avis;
    @Override
    public String getRole() {
        return "CLIENT";
    }

}
