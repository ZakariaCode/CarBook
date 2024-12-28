package net.codejava.BackCarRental.controller;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.service.VehiculeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static net.codejava.BackCarRental.Constant.Constant.IMAGE_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

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
    @PutMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("id") Long id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(vehiculeService.uploadImage(id, file));
    }
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(IMAGE_DIRECTORY + filename));
    }
    @GetMapping("/totalVehicule")
    public ResponseEntity<Long> getTotalVehicules(){
        Long vehicules =vehiculeService.getTotalVehicles();
        return ResponseEntity.ok(vehicules);
    }
    @GetMapping("/popularCars")
    public ResponseEntity<List<VehiculeDTO>> popularCars(){
        List<VehiculeDTO> vehicules =vehiculeService.popularCars();
        return ResponseEntity.ok(vehicules);
    }

}
