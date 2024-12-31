<<<<<<<< HEAD:BackCarRental/src/main/java/net/codejava/BackCarRental/service/Impl/EmailService.java
package net.codejava.BackCarRental.service.Impl;

import net.codejava.BackCarRental.service.IEmailSender;
========

package net.codejava.BackCarRental.service;

import net.codejava.BackCarRental.service.EmailSender;
>>>>>>>> Assia-Code:BackCarRental/BackCarRental/src/main/java/net/codejava/BackCarRental/service/EmailService.java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
<<<<<<<< HEAD:BackCarRental/src/main/java/net/codejava/BackCarRental/service/Impl/EmailService.java

import java.io.File;

/*import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
*/
@Service
public class EmailService implements IEmailSender {
========
>>>>>>>> Assia-Code:BackCarRental/BackCarRental/src/main/java/net/codejava/BackCarRental/service/EmailService.java

@Service
public class EmailService implements EmailSender {

    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSenderImpl mailSender;

    public EmailService(JavaMailSenderImpl mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    @Async
    public void send(String to, String doc, File attachment) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
<<<<<<<< HEAD:BackCarRental/src/main/java/net/codejava/BackCarRental/service/Impl/EmailService.java
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
========
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
>>>>>>>> Assia-Code:BackCarRental/BackCarRental/src/main/java/net/codejava/BackCarRental/service/EmailService.java
            helper.setTo(to);
            helper.setSubject("Votre "+doc);
            helper.setText("Voici votre "+doc, true);
            helper.setFrom("elhajjamzakaria65@gmail.com");

            helper.addAttachment(attachment.getName(), attachment);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
<<<<<<<< HEAD:BackCarRental/src/main/java/net/codejava/BackCarRental/service/Impl/EmailService.java
            LOGGER.error("Failed to send email with attachment", e);
            throw new IllegalStateException("Failed to send email with attachment");
========
            LOGGER.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
>>>>>>>> Assia-Code:BackCarRental/BackCarRental/src/main/java/net/codejava/BackCarRental/service/EmailService.java
        }
    }

}