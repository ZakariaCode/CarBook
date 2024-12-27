package net.codejava.BackCarRental.service;


import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaypalService {
    @Autowired
    private APIContext apicontext;


    public Payment createPayment(double total) throws PayPalRESTException {
        String currency = "USD";  // Assurez-vous que cette devise est supportée
        String cancelUrl = "http://localhost:5173/vehicules";
        String successUrl = "http://localhost:5173/vehicules";

        Amount amount = new Amount();
        amount.setCurrency(currency);
        BigDecimal totalAmount = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP);
        amount.setTotal(totalAmount.toString());

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apicontext);
    }



}
