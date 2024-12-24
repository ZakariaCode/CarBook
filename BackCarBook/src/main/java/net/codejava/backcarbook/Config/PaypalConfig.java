package net.codejava.backcarbook.Config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class PaypalConfig {

    private static final Logger logger = LoggerFactory.getLogger(PaypalConfig.class);

    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.mode}")
    private String mode;

    /**
     * Configurations spécifiques pour le SDK PayPal.
     */
    @Bean
    public Map<String, String> paypalSdkConfig() {
        Map<String, String> configMap = new HashMap<>();
        configMap.put("mode", mode); // Utilisation de la variable injectée
        configMap.put("http.ConnectionTimeOut", "5000");
        configMap.put("http.Retry", "1");
        configMap.put("http.ReadTimeOut", "30000");
        configMap.put("http.MaxConnections", "100");
        return configMap;
    }
    /**
     * Bean pour obtenir le jeton OAuth avec les identifiants PayPal.
     */
    @Bean
    public OAuthTokenCredential oAuthTokenCredential() {
        try {
            OAuthTokenCredential tokenCredential = new OAuthTokenCredential(clientId, clientSecret, paypalSdkConfig());
            logger.info("PayPal OAuthTokenCredential created with clientId: {}", clientId);
            return tokenCredential;
        } catch (Exception e) {
            logger.error("Error creating OAuthTokenCredential: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Configuration et initialisation du contexte API PayPal.
     */
    @Bean
    public APIContext apiContext() throws PayPalRESTException {
        try {
            // Récupération du jeton d'accès
            String accessToken = oAuthTokenCredential().getAccessToken();
            if (accessToken == null || accessToken.isEmpty()) {
                throw new PayPalRESTException("Access token is null or empty");
            }

            // Initialisation du contexte API
            APIContext context = new APIContext(accessToken);
            context.setConfigurationMap(paypalSdkConfig());

            logger.info("PayPal APIContext initialized successfully in {} mode.", mode);
            return context;
        } catch (PayPalRESTException e) {
            logger.error("Error initializing PayPal APIContext: {}", e.getMessage(), e);
            throw e;
        }
    }

}
