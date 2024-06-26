package com.cerbo.models;




import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class AutreInvestigateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;
    private String prenom;
    private String titre;
    private String email;
    private String affiliation;
    private String adresse;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projet_id")
    private Projet projet;
}
