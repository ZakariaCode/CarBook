package net.codejava.BackCarRental.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String email;
    private String password;
    private String CIN;
    private String adresse;
    private String ville;
    private String image;
}
