package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.codejava.BackCarRental.dto.VehiculeDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.VehiculeMapper;
import net.codejava.BackCarRental.model.StatutVehicule;
import net.codejava.BackCarRental.model.Vehicule;
import net.codejava.BackCarRental.repository.VehiculeRepository;
import net.codejava.BackCarRental.service.VehiculeService;
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
public class VehiculeServiceImpl implements VehiculeService {
    private VehiculeRepository vehiculeRepository;
    @Override
    public VehiculeDTO createVehicule(VehiculeDTO vehiculeDto) {
        Vehicule vehicule= VehiculeMapper.mapToVehicule(vehiculeDto);
        Vehicule saveVehicule=vehiculeRepository.save(vehicule);
        return VehiculeMapper.mapToVehiculeDTO(saveVehicule);
    }

    @Override
    public VehiculeDTO getVehiculeById(Long vehiculeId) {
        Vehicule vehicule= vehiculeRepository.findById(vehiculeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+vehiculeId));
        return VehiculeMapper.mapToVehiculeDTO(vehicule);
    }

    @Override
    public List<VehiculeDTO> getAllVehicules() {
        List<Vehicule> vehicules=vehiculeRepository.findAll();
        return vehicules.stream().map(vehicule ->VehiculeMapper.mapToVehiculeDTO(vehicule))
                .collect(Collectors.toList());
    }

    @Override
    public VehiculeDTO updateVehicule(Long vehiculeId, VehiculeDTO updateVehicule) {
        Vehicule vehicule= vehiculeRepository.findById(vehiculeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+vehiculeId));
        vehicule.setMarque(updateVehicule.getMarque());
        vehicule.setModele(updateVehicule.getModele());
        vehicule.setType(updateVehicule.getType());
        vehicule.setStatut(StatutVehicule.valueOf(String.valueOf(updateVehicule.getStatut())));
        vehicule.setTarif(updateVehicule.getTarif());
        vehicule.setAnnee(updateVehicule.getAnnee());
        Vehicule updateVehiculeObj=vehiculeRepository.save(vehicule);
        return VehiculeMapper.mapToVehiculeDTO(updateVehiculeObj);
    }

    @Override
    public void DeleteVehicule(Long vehiculeId) {
        Vehicule vehicule = vehiculeRepository.findById(vehiculeId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicule with ID " + vehiculeId + " not found"));
        vehiculeRepository.delete(vehicule);
    }

    @Override
    public String uploadImage(Long vehiculeId, MultipartFile file) {
        log.info("Saving picture for user ID: {}", vehiculeId);
        Vehicule vehicule= vehiculeRepository.findById(vehiculeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist"+vehiculeId));
        String imageUrl = imageFunction.apply(String.valueOf(vehiculeId), file);
        vehicule.setImage(imageUrl);
        vehiculeRepository.save(vehicule);
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
    public Long getTotalVehicles() {
        return vehiculeRepository.getTotalVehicules();
    }

    @Override
    public List<VehiculeDTO> popularCars(){
        List<Vehicule> vehicules=vehiculeRepository.popularCars();
        return vehicules.stream().map(vehicule ->VehiculeMapper.mapToVehiculeDTO(vehicule))
                .collect(Collectors.toList());
    }

}
