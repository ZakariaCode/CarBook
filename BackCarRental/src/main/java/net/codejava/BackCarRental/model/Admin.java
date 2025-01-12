package net.codejava.BackCarRental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;


@Entity
@Data  @AllArgsConstructor
@DiscriminatorValue("admin")
public class Admin extends Utilisateur {
    public Admin(String nom, String email, String password, String CIN, String adresse, String ville, String image) {
        super(nom, email, password, CIN, adresse, ville, image);
    }
    @Override
    public String getRole() {
        return "ADMIN";
    }
}
