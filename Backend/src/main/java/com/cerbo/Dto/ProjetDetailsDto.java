package com.cerbo.Dto;

import com.cerbo.models.ApplicationUser;
import lombok.Data;

import java.time.LocalDate;


@Data
public class ProjetDetailsDto {


    private ApplicationUser investigateur;
    private Long id;

    private LocalDate dateSoumission;
    private String intituleProjet;
    private String dureeEtude;
    private String typeConsentement;
    private String populationCible;
    private boolean prelevement;
    private String typePrelevement;
    private String quantitePrelevement;
    private String sourcefinancement;

    private String statut;
    private String ref;
    private LocalDate date;
    private LocalDate dateExaminationFinal;

    private boolean pasAccessible = false;

    private byte[] descriptifProjet;
    private byte[] considerationEthique;

    private byte[] ficheInformationArabe;

    private byte[] ficheInformationFrancais;

    private byte[] ficheConsentementArabe;

    private byte[] ficheConsentementFrancais;

    private byte[] attestationEngagement;

    private byte[] attestationCNDP;

    private byte[] cvInvestigateurPrincipal;

    private byte[] autresDocuments;

}
