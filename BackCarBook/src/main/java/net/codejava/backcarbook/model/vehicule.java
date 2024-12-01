package net.codejava.backcarbook.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.Year;

@Entity
public class vehicule {
    public enum Status {
        DISPONIBLE , RESERVER , ENPANNE
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String marque;
    private Year modele;
    private float kilometrage;
    private float tarif;
    private Status status;
    private String photo;

    public vehicule() {

    }
    public vehicule(String marque, Year modele, float kilometrage, float tarif, Status status, String photo) {
        this.marque = marque;
        this.modele = modele;
        this.kilometrage = kilometrage;
        this.tarif = tarif;
        this.status = status;
        this.photo = photo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Year getModele() {
        return modele;
    }

    public void setModele(Year modele) {
        this.modele = modele;
    }

    public float getKilometrage() {
        return kilometrage;
    }

    public void setKilometrage(float kilometrage) {
        this.kilometrage = kilometrage;
    }

    public float getTarif() {
        return tarif;
    }

    @Override
    public String toString() {
        return "vehicule{" +
                "id=" + id +
                ", marque='" + marque + '\'' +
                ", modele=" + modele +
                ", kilometrage=" + kilometrage +
                ", tarif=" + tarif +
                ", status=" + status +
                ", photo='" + photo + '\'' +
                '}';
    }

    public void setTarif(float tarif) {
        this.tarif = tarif;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
