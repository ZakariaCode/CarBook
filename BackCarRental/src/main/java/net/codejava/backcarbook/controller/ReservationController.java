package net.codejava.backcarbook.controller;

import net.codejava.backcarbook.dto.ReservationDTO;
import net.codejava.backcarbook.dto.VehiculeDTO;
import net.codejava.backcarbook.service.Impl.ReservationServiceImpl;
import net.codejava.backcarbook.service.Impl.VehiculeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin("*")
public class ReservationController {
    @Autowired
    private ReservationServiceImpl Rservices;
    @GetMapping
    public List<ReservationDTO> getReservations() {
        return  Rservices.getAllReservations();
    }
    @GetMapping("/getReservation/{id}")
    public ReservationDTO getVehiculeById(@PathVariable("id") Long id){
        return Rservices.getReservationById(id);
    }
    @PostMapping
    public ReservationDTO saveReservation(@RequestBody ReservationDTO reservationDTO){
        return Rservices.createReservation(reservationDTO);
    }
    @PostMapping("/update")
    public ReservationDTO updateReservation( @RequestBody ReservationDTO reservationDTO){
       return Rservices.updateReservation(reservationDTO);
    }

}

