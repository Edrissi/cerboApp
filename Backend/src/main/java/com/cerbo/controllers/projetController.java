
package com.cerbo.controllers;

import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.services.ProjetService;
import com.cerbo.services.UserService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/invis")


public class projetController {
    @Autowired
    private UserService userService;

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ProjetService projetService;


    @PostMapping("/soummis")
    public ResponseEntity<?> soumettreProjet(
            @RequestParam("intituleProjet") String intituleProjet,
            @RequestParam("dureeEtude") String dureeEtude,
            @RequestParam("typeConsentement") String typeConsentement,
            @RequestParam("populationCible") String populationCible,
            @RequestParam("typePrelevement") String typePrelevement,
            @RequestParam("sourceFinancement") String sourceFinancement,
            @RequestParam("programmeEmploiFinancement") String programmeEmploiFinancement,
            @RequestParam("descriptifProjet") MultipartFile descriptifProjet,
            @RequestParam("considerationEthique") MultipartFile considerationEthique,
            @RequestParam("ficheInformationArabe") MultipartFile ficheInformationArabe,
            @RequestParam("ficheInformationFrancais") MultipartFile ficheInformationFrancais,
            @RequestParam("ficheConsentementArabe") MultipartFile ficheConsentementArabe,
            @RequestParam("ficheConsentementFrancais") MultipartFile ficheConsentementFrancais,
            @RequestParam("attestationEngagement") MultipartFile attestationEngagement,
            @RequestParam("attestationCNDP") MultipartFile attestationCNDP,
            @RequestParam("cvInvestigateurPrincipal") MultipartFile cvInvestigateurPrincipal,
            @RequestParam("autresDocuments") MultipartFile autresDocuments
    ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Integer id;
        Jwt jwt = (Jwt) authentication.getPrincipal();
        // Access the claims from the JWT token
        String email = jwt.getSubject();
        UserDetails userDetails = userService.loadUserByUsername(email);
        ApplicationUser applicationUser = (ApplicationUser) userDetails;
        id=applicationUser.getUserId();



        try {
            Projet projet = new Projet();
            projet.setIntituleProjet(intituleProjet);
            projet.setDureeEtude(dureeEtude);
            projet.setTypeConsentement(typeConsentement);
            projet.setPopulationCible(populationCible);
            projet.setTypePrelevement(typePrelevement);
            projet.setSourcefinancement(sourceFinancement);

            projet.setDescriptifProjet(descriptifProjet.getBytes());
            projet.setConsiderationEthique(considerationEthique.getBytes());
            projet.setFicheInformationArabe(ficheInformationArabe.getBytes());
            projet.setFicheInformationFrancais(ficheInformationFrancais.getBytes());
            projet.setFicheConsentementArabe(ficheConsentementArabe.getBytes());
            projet.setFicheConsentementFrancais(ficheConsentementFrancais.getBytes());
            projet.setAttestationEngagement(attestationEngagement.getBytes());
            projet.setAttestationCNDP(attestationCNDP.getBytes());
            projet.setCvInvestigateurPrincipal(cvInvestigateurPrincipal.getBytes());
            projet.setAutresDocuments(autresDocuments.getBytes());

            projetService.enregistrerProjet(projet, id);
            return ResponseEntity.ok().body("Projet soumis avec succès !");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la soumission du projet : " + e.getMessage());
        }
    }

    private byte[] convertMultipartFileToByteArray(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte array: " + e.getMessage());
        }
    }

    @GetMapping("/projects")
    public List<Projet> getAllProjects() {
        return projetRepository.findAll();
    }

    @GetMapping("/projet/{id}")
    public Optional<Projet> getProjet(@PathVariable Long id) {
        return projetRepository.findById(id);

    }
    @GetMapping("myprojects")
    public List<Projet> getMyProjets(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Integer id;
        Jwt jwt = (Jwt) authentication.getPrincipal();
        // Access the claims from the JWT token
        String email = jwt.getSubject();
        UserDetails userDetails = userService.loadUserByUsername(email);
        ApplicationUser applicationUser = (ApplicationUser) userDetails;



        return projetRepository.findByInvestigateur(applicationUser);
    }





}
