package net.javaguides.cars.controller;

import net.javaguides.cars.dto.ReservationDTO;
import net.javaguides.cars.dto.VehiculeDTO;
import net.javaguides.cars.service.ReservationService;
import net.javaguides.cars.service.impl.ReservationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin
public class ReservationController {
    @Autowired
    private ReservationServiceImpl Rservices;
    @GetMapping
    public List<ReservationDTO> getReservations() {
        return  Rservices.getAllReservations();
    }
    @GetMapping("/{id}")
    public ReservationDTO getReservationById(@PathVariable("id") Long id){
        return Rservices.getReservationById(id);
    }
    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO){
        ReservationDTO saveReservation=Rservices.createReservation(reservationDTO);
        return new ResponseEntity<>(saveReservation, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable("id") Long reservationId, @RequestBody ReservationDTO updateReservation){
        ReservationDTO reservationDTO=Rservices.updateReservation(reservationId,updateReservation);
        return ResponseEntity.ok(reservationDTO);
    }
    @GetMapping("/paiement/{id}")
    public ResponseEntity<Date> getDatePaiementByReservationId(@PathVariable("id") Long reservationId){
        Date datePaiement=Rservices.getDatePaiementByReservationId(reservationId);
        return ResponseEntity.ok(datePaiement);
    }
    @GetMapping("/cars/{id}")
    public ResponseEntity<String> getVehiculeByReservationId(@PathVariable("id") Long reservationId){
        String Car=Rservices.getVehiculeByReservationId(reservationId);
        return ResponseEntity.ok(Car);
    }
    @GetMapping("/client/{id}")
    public ResponseEntity<String> getClientByReservationId(@PathVariable("id") Long reservationId){
        String client=Rservices.getClientByReservationId(reservationId);
        return ResponseEntity.ok(client);
    }
}
