package net.codejava.BackCarRental.controller;
import net.codejava.BackCarRental.dto.RegistrationRequest;
import net.codejava.BackCarRental.service.Impl.RegistrationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
 // Allow requests from React app
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
     public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
}
    @GetMapping(path="confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
