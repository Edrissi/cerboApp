package com.cerbo.mapper;

import com.cerbo.Dto.ProjetRequestDto;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ProjectMapper {

    public Projet mapToEntity(ProjetRequestDto dto, MultipartFile descriptifProjet, MultipartFile considerationEthique, MultipartFile ficheInformationArabe, MultipartFile ficheInformationFrancais, MultipartFile ficheConsentementFrancais, MultipartFile ficheConsentementArabe, MultipartFile attestationEngagement, MultipartFile attestationCNDP, MultipartFile cvInvestigateurPrincipal, MultipartFile autresDocuments) throws IOException {
        Projet projet = new Projet();
        projet.setIntituleProjet(dto.getIntituleProjet());
        projet.setDureeEtude(dto.getDureeEtude());
        projet.setTypeConsentement(dto.getTypeConsentement());
        projet.setPopulationCible(dto.getPopulationCible());
        projet.setTypesDonnees(dto.getTypesDonnees());
        projet.setPrelevement(dto.isPrelevement());
        projet.setTypePrelevement(dto.getTypePrelevement());
        projet.setQuantitePrelevement(dto.getQuantitePrelevement());
        projet.setSourcefinancement(dto.getSourceFinancement());
        projet.setProgrammeEmploiFinancement(dto.getProgrammeEmploiFinancement());

        // Vérification avant de définir les fichiers
        if (descriptifProjet != null && !descriptifProjet.isEmpty()) {
            projet.setDescriptifProjet(convertMultipartFileToByteArray(descriptifProjet));
        }

        if (considerationEthique != null && !considerationEthique.isEmpty()) {
            projet.setConsiderationEthique(convertMultipartFileToByteArray(considerationEthique));
        }

        if (ficheInformationArabe != null && !ficheInformationArabe.isEmpty()) {
            projet.setFicheInformationArabe(convertMultipartFileToByteArray(ficheInformationArabe));
        }

        if (ficheInformationFrancais != null && !ficheInformationFrancais.isEmpty()) {
            projet.setFicheInformationFrancais(convertMultipartFileToByteArray(ficheInformationFrancais));
        }

        if (ficheConsentementArabe != null && !ficheConsentementArabe.isEmpty()) {
            projet.setFicheConsentementArabe(convertMultipartFileToByteArray(ficheConsentementArabe));
        }

        if (ficheConsentementFrancais != null && !ficheConsentementFrancais.isEmpty()) {
            projet.setFicheConsentementFrancais(convertMultipartFileToByteArray(ficheConsentementFrancais));
        }

        if (attestationEngagement != null && !attestationEngagement.isEmpty()) {
            projet.setAttestationEngagement(convertMultipartFileToByteArray(attestationEngagement));
        }

        if (attestationCNDP != null && !attestationCNDP.isEmpty()) {
            projet.setAttestationCNDP(convertMultipartFileToByteArray(attestationCNDP));
        }

        if (cvInvestigateurPrincipal != null && !cvInvestigateurPrincipal.isEmpty()) {
            projet.setCvInvestigateurPrincipal(convertMultipartFileToByteArray(cvInvestigateurPrincipal));
        }

        if (autresDocuments != null && !autresDocuments.isEmpty()) {
            projet.setAutresDocuments(convertMultipartFileToByteArray(autresDocuments));
        }

        return projet;
    }

    public static byte[] convertMultipartFileToByteArray(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            return file.getBytes();
        }
        return null;
    }
}
