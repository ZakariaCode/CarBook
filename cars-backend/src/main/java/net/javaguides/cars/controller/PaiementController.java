package net.javaguides.cars.controller;

import lombok.AllArgsConstructor;
import net.javaguides.cars.dto.PaiementDTO;
import net.javaguides.cars.dto.ReservationDTO;
import net.javaguides.cars.service.PaiementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/paiement")
public class PaiementController {
    private PaiementService paiementService;
    @GetMapping("/{id}")
    public ResponseEntity<PaiementDTO> getPaiementById(@PathVariable("id") Long paiementId){
        PaiementDTO paiementDTO =paiementService.getPaiementById(paiementId);
        return ResponseEntity.ok(paiementDTO);
    }
    @GetMapping()
    public ResponseEntity<List<PaiementDTO>> getAllPaiements(){
        List<PaiementDTO> paiements =paiementService.getAllPaiements();
        return ResponseEntity.ok(paiements);
    }
    @PutMapping("/{id}")
    public ResponseEntity<PaiementDTO> updatePaiement(@PathVariable("id") Long paiementId, @RequestBody PaiementDTO updatePaiement){
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
