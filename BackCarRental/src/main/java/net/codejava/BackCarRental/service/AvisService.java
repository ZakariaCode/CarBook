package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.model.Avis;

import java.util.List;

public interface AvisService {
    AvisDTO createAvis(AvisDTO avis);
    List<AvisDTO> getAllAvis();
}
