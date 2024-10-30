package com.cerbo.mapper;

import com.cerbo.Dto.AutreInvestigateurDto;
import com.cerbo.models.AutreInvestigateur;
import org.springframework.stereotype.Component;

@Component
public class AutreInvestigateurMapper {
    public AutreInvestigateur mapToEntity(AutreInvestigateurDto autreInvestigateurDto){

        AutreInvestigateur autreInvestigateur = new AutreInvestigateur();

        autreInvestigateur.setNom(autreInvestigateurDto.getNom());
        autreInvestigateur.setPrenom(autreInvestigateurDto.getPrenom());
        autreInvestigateur.setTitre(autreInvestigateurDto.getTitre());
        autreInvestigateur.setEmail(autreInvestigateurDto.getEmail());
        autreInvestigateur.setAffiliation(autreInvestigateurDto.getAffiliation());
        autreInvestigateur.setAdresse(autreInvestigateurDto.getAdresse());

        return autreInvestigateur;
    }
}
