package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.ContratDTO;
import net.codejava.BackCarRental.model.Contrat;

public interface Icontrat {
    ContratDTO createContrat(ContratDTO contratDto);
}
