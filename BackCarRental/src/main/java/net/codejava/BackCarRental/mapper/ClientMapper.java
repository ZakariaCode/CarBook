package net.codejava.BackCarRental.mapper;

import net.codejava.BackCarRental.dto.ClientDTO;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.model.Reservation;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class ClientMapper {
    public static ClientDTO mapToClientDTO(Client client){
        if (client == null) {
            return null;
        }

        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(client.getId());
        clientDTO.setNom(client.getNom());
        clientDTO.setEmail(client.getEmail());
        clientDTO.setPassword(client.getPassword());
        clientDTO.setCIN(client.getCIN());
        clientDTO.setAdresse(client.getAdresse());
        clientDTO.setVille(client.getVille());
        clientDTO.setImage(client.getImage());

        List<Long> reservationIds = client.getReservations().stream()
                .map(Reservation::getId)
                .collect(Collectors.toList());
        clientDTO.setReservationIds(reservationIds);

        clientDTO.setAvisId(client.getAvis() != null ? client.getAvis().getId() : null);

        return clientDTO;
    }

    public static Client mapToClient(ClientDTO clientDTO) {
        Client client = new Client();
        client.setId(clientDTO.getId());
        client.setNom(clientDTO.getNom());
        client.setEmail(clientDTO.getEmail());
        client.setPassword(clientDTO.getPassword());
        client.setCIN(clientDTO.getCIN());
        client.setAdresse(clientDTO.getAdresse());
        client.setVille(clientDTO.getVille());
        client.setImage(clientDTO.getImage());
        if (clientDTO.getAvisId() != null) {
            Avis avis = new Avis();
            avis.setId(clientDTO.getAvisId());
            client.setAvis(avis);
        }
        client.setReservations(new ArrayList<>());
        return client;
    }
}
