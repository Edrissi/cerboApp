package com.cerbo.models;

import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


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
    private LocalDate dernierExamination;

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
    private LocalDateTime createdAt;

    // Attributs pour les fichiers PDF

    public boolean getPrelevement(){
        return prelevement;
    }
    // decision final
    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] decisionFinal;

    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")
    private byte[] descriptifProjet;

    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")
    private byte[] considerationEthique;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] ficheInformationArabe;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] ficheInformationFrancais;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] ficheConsentementArabe;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] ficheConsentementFrancais;

    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")
    private byte[] attestationEngagement;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] attestationCNDP;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] cvInvestigateurPrincipal;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] autresDocuments;


}
