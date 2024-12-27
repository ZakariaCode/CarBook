package net.codejava.BackCarRental.controller;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.AdminDTO;
import net.codejava.BackCarRental.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static net.codejava.BackCarRental.Constant.Constant.IMAGE_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {
    private AdminService adminService;
    @GetMapping()
    public ResponseEntity<AdminDTO> getAdminId(){
        AdminDTO adminDTO = adminService.getAdminById();
        return ResponseEntity.ok(adminDTO);
    }
    @PutMapping("/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(@PathVariable("id") Long adminId, @RequestBody AdminDTO updateAdmin){
        AdminDTO adminDTO= adminService.updateAdmin(adminId,updateAdmin);
        return ResponseEntity.ok(adminDTO);
    }
    @PutMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("id") Long id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(adminService.uploadImage(id, file));
    }
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(IMAGE_DIRECTORY + filename));
    }
}
