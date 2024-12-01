package net.codejava.backcarbook.model;


import jakarta.persistence.*;

@Entity
public class utilisateur {
    public enum Role {
        CLIENT , ADMIN , DIRECTEUR
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String email;
    private String password;
    private Role role;
    private String cin;
    private String adress;
    private String ville;
    private String photo;
    @ManyToOne
    @JoinColumn(name = "avis_id")
    private avis avis;
    @Override
    public String toString() {
        return "utilisateur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", cin='" + cin + '\'' +
                ", adress='" + adress + '\'' +
                ", ville='" + ville + '\'' +
                ", photo='" + photo + '\'' +
                '}';
    }

    public utilisateur() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public Role setRole(Role role) {
       return this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
