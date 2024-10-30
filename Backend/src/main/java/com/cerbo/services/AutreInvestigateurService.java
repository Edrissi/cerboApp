package com.cerbo.services;

import com.cerbo.Dto.AutreInvestigateurDto;
import com.cerbo.mapper.AutreInvestigateurMapper;
import com.cerbo.models.AutreInvestigateur;
import com.cerbo.models.Projet;
import com.cerbo.repository.AutreInvestigateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutreInvestigateurService {

    @Autowired
    private AutreInvestigateurRepository autreInvestigateurRepository;

    @Autowired
    AutreInvestigateurMapper autreInvestigateurMapper;

    public void saveAutreInvestigateur(List<AutreInvestigateurDto> autreInvestigateurDtoList, Projet projet){
        for(AutreInvestigateurDto investigateurDto : autreInvestigateurDtoList){
            AutreInvestigateur autreInvestigateur = autreInvestigateurMapper.mapToEntity(investigateurDto);
            autreInvestigateur.setProjet(projet);
            autreInvestigateurRepository.save(autreInvestigateur);
        }
    }
}
