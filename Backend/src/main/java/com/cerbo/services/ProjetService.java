package com.cerbo.services;


import com.cerbo.Dto.ProjetDTO;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.repository.ProjetRepository;
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
}