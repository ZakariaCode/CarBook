package net.codejava.BackCarRental.dto;

import java.util.Objects;



public class RegistrationRequest {
    private String nom;
    private String email;

    private String password;

    private String CIN;

    private String adresse;

    private String ville;

    public RegistrationRequest(String Name,String email, String password, String CIN, String adresse, String ville) {
        this.nom = Name;
        this.email = email;
        this.password = password;
        this.CIN = CIN;
        this.adresse = adresse;
        this.ville = ville;

    }


    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setCIN(String CIN) {
        this.CIN = CIN;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getCIN() {
        return CIN;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getFirstName() {
        return nom;
    }


    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegistrationRequest that = (RegistrationRequest) o;
        return Objects.equals(nom, that.nom) && Objects.equals(email, that.email) && Objects.equals(password, that.password) && Objects.equals(CIN, that.CIN) && Objects.equals(adresse, that.adresse) && Objects.equals(ville, that.ville);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nom, email, password, CIN, adresse, ville);
    }

    @Override
    public String toString() {
        return "RegistrationRequest{" +
                "nom='" + nom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", CIN='" + CIN + '\'' +
                ", adresse='" + adresse + '\'' +
                ", ville='" + ville + '\'' +
                '}';
    }
}






