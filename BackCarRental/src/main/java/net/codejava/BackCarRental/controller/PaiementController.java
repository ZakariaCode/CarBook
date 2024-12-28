package net.codejava.BackCarRental.controller;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.PaiementDTO;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.service.PaiementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/paiement")
public class PaiementController {
    private PaiementService paiementService;
    @PostMapping
    public ResponseEntity<PaiementDTO> savePaiement(@RequestBody PaiementDTO paiementDTO){
        PaiementDTO savePaiement=paiementService.createPaiement(paiementDTO);
        return new ResponseEntity<>(savePaiement, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaiementDTO> getPaiementById(@PathVariable("id") String paiementId){
        PaiementDTO paiementDTO =paiementService.getPaiementById(paiementId);
        return ResponseEntity.ok(paiementDTO);
    }
    @GetMapping()
    public ResponseEntity<List<PaiementDTO>> getAllPaiements(){
        List<PaiementDTO> paiements =paiementService.getAllPaiements();
        return ResponseEntity.ok(paiements);
    }
    @PutMapping("/{id}")
    public ResponseEntity<PaiementDTO> updatePaiement(@PathVariable("id") String paiementId, @RequestBody PaiementDTO updatePaiement){
        PaiementDTO paiementDTO=paiementService.updatePaiement(paiementId,updatePaiement);
        return ResponseEntity.ok(paiementDTO);
    }
    @GetMapping("/revenu")
    public ResponseEntity<Double> getRevenu(){
        double revenu=paiementService.getRevenu();
        return ResponseEntity.ok(revenu);
    }
    @GetMapping("/revenu/{year}")
    public List<Object[]> getRevenuParMois(@PathVariable("year") int year) {
        return paiementService.getRevenuParMois(year);
    }
}
