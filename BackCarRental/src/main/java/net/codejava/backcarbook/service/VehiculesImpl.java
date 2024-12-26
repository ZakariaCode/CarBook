package net.codejava.backcarbook.service;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import net.codejava.backcarbook.model.StatutVehicule;
import net.codejava.backcarbook.model.Vehicule;
import net.codejava.backcarbook.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class VehiculesImpl implements ICarBookServices{
    @Autowired private VehiculeRepository vehiculeRepository ;
    private StatutVehicule status;

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
//    List<Vehicule> vehicules = new ArrayList<>(
//            List.of(
//            new Vehicule("Mercedes", "S-Class", "automatique",status.disponible, 1500, "essence",new Date(2018 - 1900, 0, 1), "https://rent-cars.ae/public/cache/vehicle_1304/546x360/a95643ab33e5ee6f7c7cf11670431e3b/mercedes_s-class_white_2022_1304.webp"),
//            new Vehicule("BMW", "7 Series", "automatique",status.disponible, 1400,"gazoile", new Date(2019 - 1900, 0, 1), "https://cdn1.mega.mu/data/0a/31/bmw-7-series-745e-2020-217.webp"),
//            new Vehicule("Audi", "A8", "automatique",status.disponible, 1300,"essence", new Date(2020 - 1900, 0, 1), "https://journalauto.com/wp-content/uploads/2022/05/Audi-AV.jpg"),
//            new Vehicule("Porsche", "Panamera", "automatique",status.disponible, 2000,"essence", new Date(2021 - 1900, 0, 1), "https://gmz.ae/wp-content/uploads/2024/03/Rent-Porsche-Panamera-GTS-in-Dubai-900x600.webp"),
//            new Vehicule("Lexus", "LS", "automatique",status.disponible, 1200,"gazoile", new Date(2017 - 1900, 0, 1), "https://vehicle-images.dealerinspire.com/b202-110004318/JTHF51FF5R5020322/b66ce322a3fd9b4c6b9cd86e56c54028.jpg"),
//            new Vehicule("Tesla", "Model S", "automatique",status.disponible, 1100,"hybride", new Date(2022 - 1900, 0, 1), "https://americarprestige.com/wp-content/uploads/2016/11/location-tesla-model-s-1.jpg"),
//            new Vehicule("Renault", "Clio", "manuelle",status.disponible, 20000,"gazoile", new Date(2021 - 1900, 0, 1), "https://www.zylinders.com/photos/Clio%204%20New%20photo.jpg"),
//            new Vehicule("Peugeot", "208", "manuelle",status.disponible, 21000,"essence", new Date(2020 - 1900, 0, 1), "https://upload.wikimedia.org/wikipedia/commons/0/03/Peugeot_208_5door_facelift.jpg"),
//            new Vehicule("Ford", "Fiesta", "manuelle",status.disponible, 18000,"gazoile", new Date(2019 - 1900, 0, 1), "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ford_Fiesta_ST-Line_%28VII%2C_Facelift%29_%E2%80%93_f_30012023.jpg/1200px-Ford_Fiesta_ST-Line_%28VII%2C_Facelift%29_%E2%80%93_f_30012023.jpg"),
//            new Vehicule("Toyota", "Yaris", "manuelle",status.disponible, 19000,"essence", new Date(2022 - 1900, 0, 1), "https://kifalstorage.s3.amazonaws.com/new/img/toyota/yaris/principal.png"),
//            new Vehicule("Volkswagen", "Polo", "manuelle",status.disponible, 22000,"gazoile", new Date(2021 - 1900, 0, 1), "https://cdn-drivek-datak.motork.net/configurator-imgs/cars/fr/Original/VOLKSWAGEN/POLO/40485_HATCHBACK-5-DOORS/volkswagen-polo-2021-front-side-1.jpg"),
//            new Vehicule("Hyundai", "i20", "manuelle",status.disponible, 18500,"essence", new Date(2020 - 1900, 0, 1), "https://autoconseil.ma/storage/img/galery/autoconseil.ma-hyundai-i20-316068_.jpg"),
//            new Vehicule("Opel", "Corsa", "manuelle",status.disponible, 20000,"gazoile", new Date(2019 - 1900, 0, 1), "https://www.moteur.ma/media/photos/neufs/resized/moteur.ma-opel-newcorsa-257425_.jpg")
//            )
//    );
//
//    @PostConstruct
//    public void init() {
//        vehicules.forEach(vehicule -> vehiculeRepository.save(vehicule));
//    }


}
