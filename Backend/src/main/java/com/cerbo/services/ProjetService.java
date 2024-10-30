package com.cerbo.services;


import com.cerbo.Dto.ProjetDTO;
import com.cerbo.Dto.ProjetDetailsDto;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.models.ProjetValide;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.ProjetValideRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
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


        ApplicationUser applicationUser = new ApplicationUser();
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
                        projet.getDateSoumission(),
                        projet.getDureeEtude(),
                        projet.getInvestigateur(),
                        projet.getPopulationCible(), projet.getStatut(),
                        projet.getRef(),
                        projet.getPremiereExamination()))
                .collect(Collectors.toList());
    }

    public void ajouterReferenceEtFinPremiereExamination(String ref, LocalDate date, Long id) {
        Projet projet;
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));
        projet.setRef(ref);
        projet.setPremiereExamination(date);
        projet.setStatut("revised");
        projetRepository.save(projet);
    }

    public String validerProjet(Long id, String avis) {
        Projet projet;
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));


        if (avis.equals("favorable")) {
            projet.setStatut("valider");
        } else if (avis.equals("defavorable")) {
            projet.setStatut("valider");
        }

        projetRepository.save(projet);

        return "projet validé avec success";

    }

    public ProjetDetailsDto getDetailsProjet(Long projetId) {

        Projet projet = projetRepository.findById(projetId).orElseThrow(() -> new RuntimeException("Projet not found"));
        ProjetDetailsDto projetDetailsDto = new ProjetDetailsDto();

        projetDetailsDto.setId(projet.getId());
        projetDetailsDto.setIntituleProjet(projet.getIntituleProjet());
        projetDetailsDto.setDureeEtude(projet.getDureeEtude());
        projetDetailsDto.setRef(projet.getRef());
        projetDetailsDto.setPopulationCible(projet.getPopulationCible());
        projetDetailsDto.setStatut(projet.getStatut());
        projetDetailsDto.setInvestigateur(projet.getInvestigateur());

        if (projet.getStatut().equals("valider") && projet.getDateValidationFinal() != null) {
            LocalDate DateNow = LocalDate.now();
            Period period = Period.between(projet.getDateValidationFinal(), DateNow);
            int years = period.getYears();
            int months = period.getMonths();

            if (years > 0 || months > 1) {
                projetDetailsDto.setPasAccessible(true);
                return projetDetailsDto;
            }
        }
            projetDetailsDto.setDescriptifProjet(projet.getDescriptifProjet());
            projetDetailsDto.setAttestationCNDP(projet.getAttestationCNDP());
            projetDetailsDto.setAttestationEngagement(projet.getAttestationEngagement());
            projetDetailsDto.setAutresDocuments(projet.getAutresDocuments());
            projetDetailsDto.setConsiderationEthique(projet.getConsiderationEthique());
            projetDetailsDto.setCvInvestigateurPrincipal(projet.getCvInvestigateurPrincipal());
            projetDetailsDto.setFicheConsentementArabe(projet.getFicheConsentementArabe());
            projetDetailsDto.setFicheConsentementFrancais(projet.getFicheConsentementFrancais());
            projetDetailsDto.setFicheInformationArabe(projet.getFicheInformationArabe());
            projetDetailsDto.setFicheInformationFrancais(projet.getFicheInformationFrancais());
            return projetDetailsDto;



    }
}