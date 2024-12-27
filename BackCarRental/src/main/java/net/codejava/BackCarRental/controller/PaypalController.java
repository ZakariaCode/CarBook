package net.codejava.BackCarRental.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import net.codejava.BackCarRental.service.Impl.PaypalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/paypal")
@CrossOrigin
public class PaypalController {
    @Autowired
    private PaypalService service;
    @PostMapping("/payment")
    public ResponseEntity<?> payment(@RequestBody Map<String, Double> totalRequest) throws PayPalRESTException {
        double total = totalRequest.get("total");
        try {
            Payment payment = service.createPayment(total);
            for (Links link : payment.getLinks()) {
                if ("approval_url".equals(link.getRel())) {
                    return ResponseEntity.ok(Map.of("approvalUrl", link.getHref()));
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Approval URL non trouvée.");
        } catch (PayPalRESTException e) {
            if (e.getDetails() != null && e.getDetails().getName().equals("INSUFFICIENT_FUNDS")) {
                throw new PayPalRESTException("Fonds insuffisants pour cette transaction.");
            }
            throw e;
        }
    }






}
