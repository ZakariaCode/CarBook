package net.codejava.BackCarRental.controller;

import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.service.Impl.VehiculeServiceImpl;
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
