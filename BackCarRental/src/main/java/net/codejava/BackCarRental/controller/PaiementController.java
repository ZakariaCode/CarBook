package net.codejava.BackCarRental.controller;

import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.service.Impl.PaiementImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paiement")
@CrossOrigin("*")
public class PaiementController {
    @Autowired
    private PaiementImpl Pservices;
    @PostMapping
    public Paiement savePaiement(@RequestBody Paiement paiement) {
        return Pservices.createPaiment(paiement);
    }
}
