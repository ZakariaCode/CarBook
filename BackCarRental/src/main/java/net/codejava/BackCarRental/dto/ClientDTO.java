package net.codejava.BackCarRental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO extends UtilisateurDTO {
    private List<Long> reservationIds;
    private Long avisId;
}
