package net.codejava.backcarbook.service.Impl;

import net.codejava.backcarbook.model.Avis;
import net.codejava.backcarbook.repository.AvisRepository;
import net.codejava.backcarbook.service.IAvis;
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
