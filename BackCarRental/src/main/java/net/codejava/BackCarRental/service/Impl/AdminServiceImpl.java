package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.codejava.BackCarRental.dto.AdminDTO;
import net.codejava.BackCarRental.exception.ResourceNotFoundException;
import net.codejava.BackCarRental.mapper.AdminMapper;
import net.codejava.BackCarRental.model.Admin;
import net.codejava.BackCarRental.repository.AdminRepository;
import net.codejava.BackCarRental.service.AdminService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static net.codejava.BackCarRental.Constant.Constant.IMAGE_DIRECTORY;

@Slf4j
@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
    private AdminRepository adminRepository;
    @Override
    public AdminDTO getAdminById() {
        Long getid=adminRepository.getAdminId();
        Admin admin= adminRepository.findById(getid)
                .orElseThrow(()->
                        new ResourceNotFoundException("Admin is not exist"+getid));
        return AdminMapper.mapToAdminDTO(admin);
    }

    @Override
    public AdminDTO updateAdmin(Long adminId, AdminDTO updatedAdmin) {
        Admin admin= adminRepository.findById(adminId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Admin is not exist"+adminId));
        admin.setNom(updatedAdmin.getNom());
        admin.setEmail(updatedAdmin.getEmail());
        admin.setPassword(updatedAdmin.getPassword());
        admin.setAdresse(updatedAdmin.getAdresse());
        admin.setVille(updatedAdmin.getVille());
        admin.setImage(updatedAdmin.getImage());
        //admin.setReservations(updatedClient.getReservationIds());
        admin.setCIN(updatedAdmin.getCIN());
        Admin updateAdminObj=adminRepository.save(admin);
        return AdminMapper.mapToAdminDTO(updateAdminObj);
    }
    @Override
    public String uploadImage(Long adminId, MultipartFile file) {
        log.info("Saving picture for user ID: {}", adminId);
        Admin admin= adminRepository.findById(adminId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Admin is not exist"+adminId));
        String imageUrl = imageFunction.apply(String.valueOf(adminId), file);
        admin.setImage(imageUrl);
        adminRepository.save(admin);
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
                    .path("/admin/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
