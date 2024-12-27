package net.codejava.BackCarRental.controller;

import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.service.Impl.AvisImpl;
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
