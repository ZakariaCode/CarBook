package net.codejava.backcarbook.service.Impl;

import net.codejava.backcarbook.model.Contrat;
import net.codejava.backcarbook.repository.ContratRepository;
import net.codejava.backcarbook.service.Icontrat;
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
