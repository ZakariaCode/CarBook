package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.repository.AvisRepository;
import net.codejava.BackCarRental.service.IAvis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AvisImpl implements IAvis {
    @Autowired
    private AvisRepository avisRepository;
    @Override
    public Avis createAvis(Avis avis) {
        return avisRepository.save(avis);
    }
}
