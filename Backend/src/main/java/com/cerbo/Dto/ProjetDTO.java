package com.cerbo.Dto;


import com.cerbo.models.ApplicationUser;
import lombok.Data;

import java.time.LocalDate;


@Data
public class ProjetDTO {

    public ProjetDTO(){

    }
   public ProjetDTO(Long id,
                    String intituleProjet,
                    LocalDate dateSoumission,
                    String dureeEtude,
                    ApplicationUser investigateur,
                    String populationCible, String statut,
                             String ref,
                             LocalDate date
                    ){
       this.id=id;
       this.intituleProjet=intituleProjet;
       this.dateSoumission=dateSoumission;
       this.investigateur=investigateur;
       this.dureeEtude=dureeEtude;
       this.populationCible=populationCible;
       this.statut=statut;
       this.ref=ref;
       this.date=date;
   }
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






}
