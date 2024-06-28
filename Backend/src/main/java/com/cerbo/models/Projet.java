package com.cerbo.models;

import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDate;


@Data
@Entity
@Table(name = "projet")

public class Projet {

    @ManyToOne
    @JoinTable(
            name="user_projet_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="projet_id")}
    )

    private ApplicationUser investigateur;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String ref;

    @Column(nullable = true)
    // en cours - en revision - revisé - decision final
    private String statut;

    @Column(nullable = true)
    private LocalDate premiereExamination;

    private String intituleProjet;
    private String dureeEtude;
    private String typeConsentement;
    private String populationCible;
    private boolean prelevement;
    private String typesDonnees;
    private String typePrelevement;
    private String quantitePrelevement;
    private String programmeEmploiFinancement;
    private String sourcefinancement;

    // Attributs pour les fichiers PDF

    public boolean getPrelevement(){
        return prelevement;
    }
    // decision final
    @Lob
    private byte[] decisionFinal;

    @Lob
    @Column(name = "descriptif_projet", nullable = true, columnDefinition = "LONGBLOB")
    private byte[] descriptifProjet;

    @Lob
    private byte[] considerationEthique;

    @Lob
    private byte[] ficheInformationArabe;

    @Lob
    private byte[] ficheInformationFrancais;

    @Lob
    private byte[] ficheConsentementArabe;

    @Lob
    private byte[] ficheConsentementFrancais;

    @Lob
    private byte[] attestationEngagement;

    @Lob
    private byte[] attestationCNDP;

    @Lob
    private byte[] cvInvestigateurPrincipal;

    @Lob
    private byte[] autresDocuments;


}
