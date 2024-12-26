package net.codejava.backcarbook.controller;


import net.codejava.backcarbook.model.Contrat;
import net.codejava.backcarbook.service.Impl.ContratImpl;
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
