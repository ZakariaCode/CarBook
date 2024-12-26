package net.codejava.backcarbook.controller;

import net.codejava.backcarbook.dto.VehiculeDTO;
import net.codejava.backcarbook.model.Vehicule;
import net.codejava.backcarbook.service.Impl.VehiculeServiceImpl;
import net.codejava.backcarbook.service.VehiculesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicules")
@CrossOrigin
public class VehiculesController {
    @Autowired
    private VehiculeServiceImpl Vservices;
    @GetMapping
    public List<VehiculeDTO> getVehicules(){
       return  Vservices.getAllVehicules();
    }
    @GetMapping("/getVehicule/{id}")
    public VehiculeDTO getVehiculeById(@PathVariable("id") Long id){
        return Vservices.getVehiculeById(id);
    }

}
