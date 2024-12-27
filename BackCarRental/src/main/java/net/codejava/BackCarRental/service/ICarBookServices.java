package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.model.Vehicule;

import java.util.List;

public interface ICarBookServices {
    public void InitVehicules();
    public List<Vehicule> getAllVehicule();
}
