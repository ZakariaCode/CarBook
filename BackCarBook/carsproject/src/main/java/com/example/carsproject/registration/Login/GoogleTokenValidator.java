/*package com.example.carsproject.registration.Login;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.json.jackson2.JacksonFactory; // For JacksonFactory



import java.util.Collections;

public class GoogleTokenValidator {
    public static void validateToken(String idTokenString) throws Exception {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(GoogleNetHttpTransport.newTrustedTransport(), jsonFactory)
                .setAudience(Collections.singletonList("http://1005441791638-g0kr2a9md7jkg91b9de7drl5nss2jp38.apps.googleusercontent.com"))
                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            System.out.println("User ID: " + payload.getSubject());
            System.out.println("Email: " + payload.getEmail());
        } else {
            throw new Exception("Invalid ID token");
        }
    }
}
*/