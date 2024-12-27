package net.codejava.BackCarRental.controller;


import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.service.Impl.ContratImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contrat")
@CrossOrigin
public class ContratController {
    @Autowired
    private ContratImpl Cservices;
    @PostMapping
    public Contrat saveContrat(@RequestBody Contrat contrat) {
        return Cservices.createContrat(contrat);
    }
}
