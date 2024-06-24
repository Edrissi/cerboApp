package com.cerbo.services;


import com.cerbo.Dto.ProjetDTO;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.models.ProjetValide;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.ProjetValideRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ProjetValideRepository projetValideRepository;
    @Autowired
    private UserRepository userRepository;


    public void enregistrerProjet(Projet projet, Integer id) {


        ApplicationUser applicationUser= new ApplicationUser();
        applicationUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        projet.setInvestigateur(applicationUser);
        // Enregistrer le projet dans la base de données
        projetRepository.save(projet);

    }

    public List<ProjetDTO> getAllProjects() {
        List<Projet> projets = projetRepository.findAll();
        return projets.stream()
                .map(projet -> new ProjetDTO(projet.getId(),
                                            projet.getIntituleProjet(),
                                            projet.getDureeEtude(),
                                            projet.getInvestigateur(),
                                            projet.getPopulationCible(),projet.getStatut(),
                        projet.getRef(),
                        projet.getPremiereExamination()))
                .collect(Collectors.toList());
    }

    public void ajouterReferenceEtFinPremiereExamination(String ref, LocalDate date, Long id){
        Projet projet;
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));
        projet.setRef(ref);
        projet.setPremiereExamination(date);
        projet.setStatut("revised");
        projetRepository.save(projet);
    }

    public String validerProjet(Long id , byte[] finalDecision){
        Projet projet;
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));

        ProjetValide projetValide = new ProjetValide() ;

        // code de projet
        projetValide.setCode(projet.getRef());

        //
        projetValide.setIntituleProjet(projet.getIntituleProjet());
        projetValide.setInvestigateur(projet.getInvestigateur());

        // date a regler
        projetValide.setDateDepot(projet.getPremiereExamination());
        projetValide.setDateValidation(projet.getPremiereExamination());


        projetValide.setDureeEtude(projet.getDureeEtude());
        projetValide.setTypeConsentement(projet.getTypeConsentement());
        projetValide.setPopulationCible(projet.getPopulationCible());
        projetValide.setPrelevement(projet.getPrelevement());

        projetValide.setTypePrelevement(projet.getTypePrelevement());
        projetValide.setQuantitePrelevement(projet.getQuantitePrelevement());
        projetValide.setSourcefinancement(projet.getSourcefinancement());


        // ajouter les files -----------------
        projetValide.setDecisionFinal(finalDecision);
        projetValide.setDescriptifProjet(projet.getDescriptifProjet());
        projetValide.setAttestationCNDP(projet.getAttestationCNDP());
        projetValide.setAttestationEngagement(projet.getAttestationEngagement());

        projetValide.setFicheInformationFrancais(projet.getFicheInformationFrancais());
        projetValide.setFicheConsentementFrancais(projet.getFicheConsentementFrancais());

        projetValide.setFicheInformationArabe(projet.getFicheInformationArabe());
        projetValide.setFicheConsentementArabe(projet.getFicheConsentementArabe());

        projetValide.setConsiderationEthique(projet.getConsiderationEthique());
        projetValide.setCvInvestigateurPrincipal(projet.getCvInvestigateurPrincipal());
        projetValide.setAutresDocuments(projet.getAutresDocuments());

        projetValideRepository.save(projetValide);

        projet.setDecisionFinal(null);
        projet.setDescriptifProjet(null);
        projet.setAttestationCNDP(null);
        projet.setAttestationEngagement(null);

        projet.setFicheInformationFrancais(null);
        projet.setFicheConsentementFrancais(null);

        projet.setFicheInformationArabe(null);
        projet.setFicheConsentementArabe(null);

        projet.setConsiderationEthique(null);
        projet.setCvInvestigateurPrincipal(null);
        projet.setAutresDocuments(null);

        projet.setStatut("valider");

        projetRepository.save(projet);

        return "projet validé avec success";

    }
}