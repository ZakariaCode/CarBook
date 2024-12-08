package net.javaguides.cars.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.javaguides.cars.model.Reservation;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO extends UtilisateurDTO {
    private List<Long> reservationIds;
    private Long avisId;
}
