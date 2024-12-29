package net.codejava.BackCarRental.service.Impl;

import lombok.AllArgsConstructor;
import net.codejava.BackCarRental.dto.ContratDTO;
import net.codejava.BackCarRental.dto.PaiementDTO;
import net.codejava.BackCarRental.mapper.ContratMapper;
import net.codejava.BackCarRental.model.Contrat;
import net.codejava.BackCarRental.model.Paiement;
import net.codejava.BackCarRental.repository.ContratRepository;
import net.codejava.BackCarRental.service.Icontrat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ContratImpl implements Icontrat {
    private ContratRepository contratRepository;
    private ContratMapper contratMapper;
    @Override
    public ContratDTO createContrat(ContratDTO contratDto) {
        Contrat contrat= contratMapper.mapToContrat(contratDto);
        Contrat saveContrat=contratRepository.save(contrat);
        return contratMapper.mapToContratDTO(saveContrat);
    }
}
