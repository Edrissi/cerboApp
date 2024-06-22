package com.cerbo.models;

import lombok.Data;
import jakarta.persistence.*;

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

    private String intituleProjet;
    private String dureeEtude;
    private String typeConsentement;
    private String populationCible;
    private boolean prelevement;
    private String typePrelevement;
    private String quantitePrelevement;
    private String sourcefinancement;

    // Attributs pour les fichiers PDF
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
