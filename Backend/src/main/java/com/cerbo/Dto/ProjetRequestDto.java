package com.cerbo.Dto;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjetRequestDto {
    private String intituleProjet;
    private String dureeEtude;
    private String typeConsentement;
    private String populationCible;
    private String typesDonnees;
    private boolean prelevement;
    private String typePrelevement;
    private String quantitePrelevement;
    private String sourceFinancement;
    private String programmeEmploiFinancement;
    private List<AutreInvestigateurDto> autreInvestigateurDtos;
}
