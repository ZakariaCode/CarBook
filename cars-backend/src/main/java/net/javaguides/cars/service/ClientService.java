package net.javaguides.cars.service;

import net.javaguides.cars.dto.ClientDTO;

import java.util.List;

public interface ClientService {
    List<ClientDTO> getAllClients();
    ClientDTO getClientById(Long clientId);
    ClientDTO updateClient(Long clientId, ClientDTO updatedClient);
}
