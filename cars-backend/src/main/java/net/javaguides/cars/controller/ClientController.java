package net.javaguides.cars.controller;

import lombok.AllArgsConstructor;
import net.javaguides.cars.dto.ClientDTO;
import net.javaguides.cars.service.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/customers")
public class ClientController {
    private ClientService clientService;
    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getPaiementById(@PathVariable("id") Long clientId){
        ClientDTO paiementDTO = clientService.getClientById(clientId);
        return ResponseEntity.ok(paiementDTO);
    }
    @GetMapping()
    public ResponseEntity<List<ClientDTO>> getAllPaiements(){
        List<ClientDTO> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updatePaiement(@PathVariable("id") Long clientId, @RequestBody ClientDTO updateClient){
        ClientDTO clientDTO= clientService.updateClient(clientId,updateClient);
        return ResponseEntity.ok(clientDTO);
    }
}
