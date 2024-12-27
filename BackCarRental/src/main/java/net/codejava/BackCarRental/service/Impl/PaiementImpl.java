package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.repository.PaiementRepository;
import net.codejava.BackCarRental.service.Ipaiement;
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
