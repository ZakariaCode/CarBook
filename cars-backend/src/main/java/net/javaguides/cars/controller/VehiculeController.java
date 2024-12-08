package net.javaguides.cars.controller;

import lombok.AllArgsConstructor;
import net.javaguides.cars.dto.VehiculeDTO;
import net.javaguides.cars.service.VehiculeService;
import net.javaguides.cars.service.impl.VehiculeServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/cars")
public class VehiculeController {
    private VehiculeService vehiculeService;
    @PostMapping
    public ResponseEntity<VehiculeDTO> createVehicule(@RequestBody VehiculeDTO vehiculeDTO){
        VehiculeDTO saveVehicule=vehiculeService.createVehicule(vehiculeDTO);
        return new ResponseEntity<>(saveVehicule, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<VehiculeDTO> getVehiculeById(@PathVariable("id") Long vehiculeId){
        VehiculeDTO vehiculeDTO =vehiculeService.getVehiculeById(vehiculeId);
        return ResponseEntity.ok(vehiculeDTO);
    }
    @GetMapping()
    public ResponseEntity<List<VehiculeDTO>> getAllVehicules(){
        List<VehiculeDTO> vehicules =vehiculeService.getAllVehicules();
        return ResponseEntity.ok(vehicules);
    }
    @PutMapping("/{id}")
    public ResponseEntity<VehiculeDTO> updateVehicule(@PathVariable("id") Long vehiculeId,@RequestBody VehiculeDTO updatevehicule){
        VehiculeDTO VehiculeDTO=vehiculeService.updateVehicule(vehiculeId,updatevehicule);
        return ResponseEntity.ok(VehiculeDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> DeleteVehicule(@PathVariable("id") Long vehiculeId){
         vehiculeService.DeleteVehicule(vehiculeId);
         return ResponseEntity.ok("vehicule supprime avec succes");
    }

}
