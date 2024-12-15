package net.javaguides.cars.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.cars.dto.ClientDTO;
import net.javaguides.cars.exception.ResourceNotFoundException;
import net.javaguides.cars.mapper.ClientMapper;
import net.javaguides.cars.model.Client;
import net.javaguides.cars.repository.ClientRepository;
import net.javaguides.cars.service.ClientService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {
    private ClientRepository clientRepository;

    @Override
    public List<ClientDTO> getAllClients() {
        List<Client> clients=clientRepository.findAll();
        return clients.stream().map(client -> ClientMapper.mapToClientDTO(client))
                .collect(Collectors.toList());
    }

    @Override
    public ClientDTO getClientById(Long clientId) {
        Client client= clientRepository.findById(clientId)
                .orElseThrow(()->
                        new ResourceNotFoundException("client is not exist"+clientId));
        return ClientMapper.mapToClientDTO(client);
    }
    public ClientDTO updateClient(Long clientId, ClientDTO updatedClient){
        Client client= clientRepository.findById(clientId)
                .orElseThrow(()->
                        new ResourceNotFoundException("client is not exist"+clientId));
        client.setNom(updatedClient.getNom());
        client.setEmail(updatedClient.getEmail());
        client.setPassword(updatedClient.getPassword());
        client.setAdresse(updatedClient.getAdresse());
        client.setVille(updatedClient.getVille());
        client.setImage(updatedClient.getImage());
        //client.setReservations(updatedClient.getReservationIds());
        client.setCIN(updatedClient.getCIN());
        Client updateClientObj=clientRepository.save(client);
        return ClientMapper.mapToClientDTO(updateClientObj);
    }
}
