package com.example.carsproject;

import com.example.carsproject.Car;
import com.example.carsproject.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {
    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public List<Car> getCars() {
        return carRepository.findAll();
    }
}
