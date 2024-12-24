package net.codejava.backcarbook.controller;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.model.Paiement;
import net.codejava.backcarbook.service.Impl.PaiementImpl;
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
