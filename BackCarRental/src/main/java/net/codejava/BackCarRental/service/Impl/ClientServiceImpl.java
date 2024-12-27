package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.ClientDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.AvisMapper;
import net.codejava.BackCarRental.mapper.ClientMapper;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.repository.AvisRepository;
import net.codejava.BackCarRental.repository.ClientRepository;
import net.codejava.BackCarRental.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {
    private ClientRepository clientRepository;
    @Autowired
    private AvisRepository avisRepository;

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
        Avis avis= avisRepository.findById(updatedClient.getAvisId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Vehicule is not exist"+updatedClient.getAvisId()));
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
        client.setAvis(avis);
        Client updateClientObj=clientRepository.save(client);
        return ClientMapper.mapToClientDTO(updateClientObj);

    }
    public Long nombres_communaute(){
        return clientRepository.nombres_communaute();
    }
    public AvisDTO getAvisByClientId(Long clientId){
        Avis avis= avisRepository.findById(getClientById(clientId).getAvisId())
                .orElseThrow(()->
                        new ResourceNotFoundException("client non trouvé pour la réservation ID"+clientId));
        return AvisMapper.mapToAvisDTO(avis);
    }
    public List<ClientDTO> getAllClientAvis(){
        List<Client> clients=clientRepository.getAllClientAvis();
        return clients.stream().map(client -> ClientMapper.mapToClientDTO(client))
                .collect(Collectors.toList());
    }
}

