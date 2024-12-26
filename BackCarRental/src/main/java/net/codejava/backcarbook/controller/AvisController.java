package net.codejava.backcarbook.controller;

import net.codejava.backcarbook.model.Avis;
import net.codejava.backcarbook.model.Contrat;
import net.codejava.backcarbook.service.Impl.AvisImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/avis")
@CrossOrigin
public class AvisController {
    @Autowired
    private AvisImpl Aservices;
    @PostMapping
    public Avis saveAvis(@RequestBody Avis avis) {
        return Aservices.createAvis(avis);
    }
}
