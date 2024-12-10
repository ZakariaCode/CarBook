package net.codejava.backcarbook.service;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import net.codejava.backcarbook.model.Vehicule;
import net.codejava.backcarbook.repository.VehiculeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class VehiculesImpl implements ICarBookServices{
    @Autowired private VehiculeRepo vehiculeRepository ;

    @Override
    public void InitVehicules() {

    }

    @Override
    public List<Vehicule> getAllVehicule() {
        return vehiculeRepository.findAll();
    }
    public Vehicule getVehiculeById(Long id) {
        return vehiculeRepository.findById(id).get();
    }
    List<Vehicule> vehicules = new ArrayList<>(
            List.of(
            new Vehicule("Mercedes", "S-Class", "Luxe", 1500, new Date(2018 - 1900, 0, 1), "https://rent-cars.ae/public/cache/vehicle_1304/546x360/a95643ab33e5ee6f7c7cf11670431e3b/mercedes_s-class_white_2022_1304.webp"),
            new Vehicule("BMW", "7 Series", "Luxe", 1400, new Date(2019 - 1900, 0, 1), "https://cdn1.mega.mu/data/0a/31/bmw-7-series-745e-2020-217.webp"),
            new Vehicule("Audi", "A8", "Luxe", 1300, new Date(2020 - 1900, 0, 1), "https://journalauto.com/wp-content/uploads/2022/05/Audi-AV.jpg"),
            new Vehicule("Porsche", "Panamera", "Luxe", 2000, new Date(2021 - 1900, 0, 1), "https://gmz.ae/wp-content/uploads/2024/03/Rent-Porsche-Panamera-GTS-in-Dubai-900x600.webp"),
            new Vehicule("Lexus", "LS", "Luxe", 1200, new Date(2017 - 1900, 0, 1), "https://vehicle-images.dealerinspire.com/b202-110004318/JTHF51FF5R5020322/b66ce322a3fd9b4c6b9cd86e56c54028.jpg"),
            new Vehicule("Tesla", "Model S", "Luxe", 1100, new Date(2022 - 1900, 0, 1), "https://americarprestige.com/wp-content/uploads/2016/11/location-tesla-model-s-1.jpg"),
            new Vehicule("Renault", "Clio", "Citadine", 20000, new Date(2021 - 1900, 0, 1), "https://www.zylinders.com/photos/Clio%204%20New%20photo.jpg"),
            new Vehicule("Peugeot", "208", "Citadine", 21000, new Date(2020 - 1900, 0, 1), "https://upload.wikimedia.org/wikipedia/commons/0/03/Peugeot_208_5door_facelift.jpg"),
            new Vehicule("Ford", "Fiesta", "Citadine", 18000, new Date(2019 - 1900, 0, 1), "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ford_Fiesta_ST-Line_%28VII%2C_Facelift%29_%E2%80%93_f_30012023.jpg/1200px-Ford_Fiesta_ST-Line_%28VII%2C_Facelift%29_%E2%80%93_f_30012023.jpg"),
            new Vehicule("Toyota", "Yaris", "Citadine", 19000, new Date(2022 - 1900, 0, 1), "https://example.com/toyota-yaris.jpg"),
            new Vehicule("Volkswagen", "Polo", "Citadine", 22000, new Date(2021 - 1900, 0, 1), "https://cdn-drivek-datak.motork.net/configurator-imgs/cars/fr/Original/VOLKSWAGEN/POLO/40485_HATCHBACK-5-DOORS/volkswagen-polo-2021-front-side-1.jpg"),
            new Vehicule("Hyundai", "i20", "Citadine", 18500, new Date(2020 - 1900, 0, 1), "https://autoconseil.ma/storage/img/galery/autoconseil.ma-hyundai-i20-316068_.jpg"),
            new Vehicule("Opel", "Corsa", "Citadine", 20000, new Date(2019 - 1900, 0, 1), "https://www.moteur.ma/media/photos/neufs/resized/moteur.ma-opel-newcorsa-257425_.jpg")
            )
    );

    @PostConstruct
    public void init() {
        vehicules.forEach(vehicule -> vehiculeRepository.save(vehicule));
    }


}
