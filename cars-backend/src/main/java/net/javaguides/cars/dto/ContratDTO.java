package net.javaguides.cars.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratDTO {
    private Long id;
    private String reglement ;
    private Date date;
    private Long reservationId;
}
