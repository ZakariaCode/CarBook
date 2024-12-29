package net.codejava.BackCarRental.controller;


import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.ContratDTO;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.service.Impl.ContratImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/contrat")
@CrossOrigin
public class ContratController {
    private ContratImpl Cservices;
    @PostMapping
    public ContratDTO saveContrat(@RequestBody ContratDTO contrat){
        ContratDTO saveContrat=Cservices.createContrat(contrat);
        return  saveContrat;
    }
}
