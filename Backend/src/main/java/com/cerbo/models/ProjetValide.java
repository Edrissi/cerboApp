package com.cerbo.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "projet_valide")


public class ProjetValide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;


    @ManyToOne
    @JoinTable(
            name="user_projetvalide_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="projet_id")}
    )

    private ApplicationUser investigateur;


    @Column(nullable = true)
    private LocalDate dateDepot;

    private LocalDate dateValidation;

    private String intituleProjet;
    private String dureeEtude;
    private String typeConsentement;
    private String populationCible;
    private boolean prelevement;
    private String typePrelevement;
    private String quantitePrelevement;
    private String sourcefinancement;

    // Attributs pour les fichiers PDF

    // decision final

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
    private byte[] decisionFinal;

    @Lob
    @Column(name = "descriptif_projet", nullable = true, columnDefinition = "LONGBLOB")
    private byte[] descriptifProjet;

    @Lob
    @Column( nullable = true, columnDefinition = "LONGBLOB")
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
    @Column( nullable = true, columnDefinition = "LONGBLOB")
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
