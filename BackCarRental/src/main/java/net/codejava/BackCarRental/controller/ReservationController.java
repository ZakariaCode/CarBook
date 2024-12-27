package net.codejava.BackCarRental.controller;

import net.codejava.BackCarRental.dto.ReservationDTO;
import net.codejava.BackCarRental.service.Impl.ReservationServiceImpl;
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

