package net.codejava.BackCarRental.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.ClientDTO;
import net.codejava.BackCarRental.service.ClientService;
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

@Slf4j
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
    public ResponseEntity<ClientDTO> updateClient(@PathVariable("id") Long clientId, @RequestBody ClientDTO updateClient){
        ClientDTO clientDTO= clientService.updateClient(clientId,updateClient);
        return ResponseEntity.ok(clientDTO);
    }
    @GetMapping("/clients_communaute")
    public ResponseEntity<Long> nombres_communaute(){
        Long clients = clientService.nombres_communaute();
        return ResponseEntity.ok(clients);
    }
    @GetMapping("/avis/{id}")
    public ResponseEntity<AvisDTO> getAvisByIdClient(@PathVariable("id") Long clientId){
        AvisDTO avis = clientService.getAvisByClientId(clientId);
        return ResponseEntity.ok(avis);
    }
    @GetMapping("/avis")
    public ResponseEntity<List<ClientDTO>> getAllClientAvis(){
        List<ClientDTO> client = clientService.getAllClientAvis();
        return  ResponseEntity.ok(client);
    }
    @PutMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("id") Long id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(clientService.uploadImage(id, file));
    }
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(IMAGE_DIRECTORY + filename));
    }
}
