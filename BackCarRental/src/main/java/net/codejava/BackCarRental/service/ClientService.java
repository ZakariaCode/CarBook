package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.ClientDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ClientService {
    List<ClientDTO> getAllClients();
    ClientDTO getClientById(Long clientId);
    ClientDTO updateClient(Long clientId, ClientDTO updatedClient);
    Long nombres_communaute();
    AvisDTO getAvisByClientId(Long clientId);
    List<ClientDTO> getAllClientAvis();
    String uploadImage(Long clientId, MultipartFile file);
}
