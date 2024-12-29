package net.codejava.BackCarRental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class BackCarRentalApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackCarRentalApplication.class, args);
	}

}
