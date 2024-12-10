package net.codejava.backcarbook.service;

import net.codejava.backcarbook.model.Vehicule;

import java.util.List;

public interface ICarBookServices {
    public void InitVehicules();
    public List<Vehicule> getAllVehicule();
}
