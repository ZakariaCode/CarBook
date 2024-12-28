package net.codejava.BackCarRental.controller;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.service.AvisService;
import net.codejava.BackCarRental.service.Impl.AvisServiceImp;
import net.codejava.BackCarRental.service.VehiculeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/avis")
public class AvisController {
    private AvisServiceImp avisService;
    @PostMapping
    public ResponseEntity<AvisDTO> createAvis(@RequestBody AvisDTO avisDTO){
        AvisDTO savedAvis =avisService.createAvis(avisDTO);
        return new ResponseEntity<>(savedAvis , HttpStatus.CREATED);
    }
}
