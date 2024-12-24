package net.codejava.backcarbook.controller;

import net.codejava.backcarbook.service.EmailSender;
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

    private final EmailSender emailSender;

    @Autowired
    public EmailController(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

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
            emailSender.send(email,doc, tempFile);

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
