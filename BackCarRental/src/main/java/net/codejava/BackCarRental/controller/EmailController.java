package net.codejava.BackCarRental.controller;

import net.codejava.BackCarRental.service.IEmailSender;
import net.codejava.BackCarRental.service.Impl.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/email")
@CrossOrigin
public class EmailController {

    @Autowired
    private EmailService emailService;


    @PostMapping("/send-pdf")
    public ResponseEntity<String> sendEmailWithPdf(
            @RequestParam("email") String email,
            @RequestParam("pdf") MultipartFile pdfFile,
            @RequestParam("document") String doc) {

        try {
            // Sauvegarder temporairement le fichier reçu
            File tempFile = File.createTempFile(doc, ".pdf");
            pdfFile.transferTo(tempFile);

            // Envoyer l'email avec le fichier PDF attaché
            emailService.send(email,doc, tempFile);

            // Supprimer le fichier temporaire après l'envoi
            tempFile.delete();

            return ResponseEntity.ok("Email envoyé avec succès à " + email);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors du traitement du fichier PDF : " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'envoi de l'email : " + e.getMessage());
        }
    }
}
