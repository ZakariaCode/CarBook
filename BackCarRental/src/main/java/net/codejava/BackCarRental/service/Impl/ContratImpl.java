package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.repository.ContratRepository;
import net.codejava.BackCarRental.service.Icontrat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContratImpl implements Icontrat {
    @Autowired
    private ContratRepository contratRepository;
    @Override
    public Contrat createContrat(Contrat contrat) {
        return contratRepository.save(contrat);
    }
}
