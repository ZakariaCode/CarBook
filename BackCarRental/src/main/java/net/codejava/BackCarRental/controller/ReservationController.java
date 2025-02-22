package net.codejava.BackCarRental.controller;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.ReservationDTO;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.service.Impl.ReservationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/reservations")
@CrossOrigin("*")
public class ReservationController {
    private ReservationServiceImpl Rservices;

    @GetMapping()
    public ResponseEntity<List<ReservationDTO>> getReservations(){
        List<ReservationDTO> reservations =Rservices.getAllReservations();
        return ResponseEntity.ok(reservations);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable("id") Long id){
        ReservationDTO reservationDTO =Rservices.getReservationById(id);
        return ResponseEntity.ok(reservationDTO);
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO){
        ReservationDTO saveReservation=Rservices.createReservation(reservationDTO);
        return new ResponseEntity<>(saveReservation, HttpStatus.CREATED);
    }
    @PostMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable("id") Long reservationId,@RequestBody ReservationDTO updateReservation){
        ReservationDTO reservation=Rservices.updateReservation(reservationId,updateReservation);
        return ResponseEntity.ok(reservation);
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
    @GetMapping("/totalReservation")
    public ResponseEntity<Long> getTotalReservations(){
        Long reservations =Rservices.getTotalReservations();
        return ResponseEntity.ok(reservations);
    }
    @GetMapping("/nombre/{year}")
    public ResponseEntity<List<Object[]>> getNombreReservationsParMois(@PathVariable("year") int year) {
        List<Object[]> reservations =Rservices.getNombreReservationsParMois(year);
        return ResponseEntity.ok(reservations);
    }
    @GetMapping("/clients-fideles")
    public ResponseEntity<Long> getClientsFideles() {
        Long nombreClientsFideles = Rservices.countClientsFideles();
        return ResponseEntity.ok(nombreClientsFideles);
    }
}
