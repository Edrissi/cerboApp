package com.cerbo.Dto;


import com.cerbo.models.ApplicationUser;
import lombok.Data;


@Data
public class ProjetDTO {

    public ProjetDTO(){

    }
   public ProjetDTO(Long id, String intituleProjet,String dureeEtude,ApplicationUser investigateur,String populationCible){
       this.id=id;
       this.intituleProjet=intituleProjet;
       this.investigateur=investigateur;
       this.dureeEtude=dureeEtude;
       this.populationCible=populationCible;
   }
    private ApplicationUser investigateur;

    private Long id;

    private String intituleProjet;
    private String dureeEtude;
    private String typeConsentement;
    private String populationCible;
    private boolean prelevement;
    private String typePrelevement;
    private String quantitePrelevement;
    private String sourcefinancement;






}
