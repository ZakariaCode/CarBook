package net.codejava.backcarbook.service.Impl;

import net.codejava.backcarbook.model.Paiement;
import net.codejava.backcarbook.repository.PaiementRepository;
import net.codejava.backcarbook.service.Ipaiement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaiementImpl implements Ipaiement {
    @Autowired
    PaiementRepository Prep;

    @Override
    public Paiement createPaiment(Paiement paiement) {
       Paiement p= Prep.save(paiement);
       return p;
    }
}
