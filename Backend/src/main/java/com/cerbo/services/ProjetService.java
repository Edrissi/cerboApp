package com.cerbo.services;


import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}