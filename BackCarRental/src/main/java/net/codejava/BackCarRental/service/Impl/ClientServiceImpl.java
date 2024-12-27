package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.codejava.BackCarRental.dto.AvisDTO;
import net.codejava.BackCarRental.dto.ClientDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.AvisMapper;
import net.codejava.BackCarRental.mapper.ClientMapper;
import net.codejava.BackCarRental.model.Avis;
import net.codejava.BackCarRental.model.Client;
import net.codejava.BackCarRental.model.Vehicule;
import net.codejava.BackCarRental.repository.AvisRepository;
import net.codejava.BackCarRental.repository.ClientRepository;
import net.codejava.BackCarRental.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static net.codejava.BackCarRental.Constant.Constant.IMAGE_DIRECTORY;
@Slf4j
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
    @Override
    public String uploadImage(Long clientId, MultipartFile file) {
        log.info("Saving picture for user ID: {}", clientId);
        Client client= clientRepository.findById(clientId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+clientId));
        String imageUrl = imageFunction.apply(String.valueOf(clientId), file);
        client.setImage(imageUrl);
        clientRepository.save(client);
        return imageUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".jpg");

    private final BiFunction<String, MultipartFile, String> imageFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(IMAGE_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/cars/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}

