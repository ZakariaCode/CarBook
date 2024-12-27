package com.example.carsproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CarsprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarsprojectApplication.class, args);
	}

}
