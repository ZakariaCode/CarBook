package net.codejava.BackCarRental.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;

/*import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
*/
@Service
public class EmailService implements EmailSender{

    private final static Logger LOGGER = LoggerFactory
            .getLogger(EmailService.class);

    private final JavaMailSenderImpl mailSender;

    public EmailService(JavaMailSenderImpl mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    @Async
    public void send(String to, String doc, File attachment) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject("Votre "+doc);
            helper.setText("Voici votre "+doc, true);
            helper.setFrom("elhajjamzakaria65@gmail.com");

            helper.addAttachment(attachment.getName(), attachment);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email with attachment", e);
            throw new IllegalStateException("Failed to send email with attachment");
        }
    }

}