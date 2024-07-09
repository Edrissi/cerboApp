
package com.cerbo.controllers;


import com.cerbo.Dto.AutreInvestigateurDto;
import com.cerbo.Dto.ProjetDTO;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.AutreInvestigateur;
import com.cerbo.models.Projet;
import com.cerbo.repository.AutreInvestigateurRepository;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.services.ProjetService;
import com.cerbo.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;


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
    private AutreInvestigateurRepository autreInvestigateurRepository;

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
    public List<ProjetDTO> getAllProjects() {
        return projetService.getAllProjects();
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


    @PostMapping("/creer")
    public ResponseEntity<?> creerProjet(
            @RequestParam("intituleProjet") String intituleProjet,
            @RequestParam("dureeEtude") String dureeEtude,
            @RequestParam("typeConsentement") String typeConsentement,
            @RequestParam("populationCible") String populationCible,
            @RequestParam("typesDonnees") String typesDonnees,
            @RequestParam("prelevement") boolean prelevement,
            @RequestParam("typePrelevement") String typePrelevement,
            @RequestParam("quantitePrelevement") String quantitePrelevement,
            @RequestParam("sourceFinancement") String sourceFinancement,
            @RequestParam("programmeEmploiFinancement") String programmeEmploiFinancement,
            @RequestParam(value = "descriptifProjet", required = false) MultipartFile descriptifProjet,
            @RequestParam(value = "considerationEthique", required = false) MultipartFile considerationEthique,
            @RequestParam(value = "ficheInformationArabe", required = false) MultipartFile ficheInformationArabe,
            @RequestParam(value = "ficheInformationFrancais", required = false) MultipartFile ficheInformationFrancais,
            @RequestParam(value = "ficheConsentementFrancais", required = false) MultipartFile ficheConsentementFrancais,
            @RequestParam(value = "ficheConsentementArabe", required = false) MultipartFile ficheConsentementArabe,

            @RequestParam(value = "attestationEngagement", required = false) MultipartFile attestationEngagement,
            @RequestParam(value = "attestationCNDP", required = false) MultipartFile attestationCNDP,
            @RequestParam(value = "cvInvestigateurPrincipal", required = false) MultipartFile cvInvestigateurPrincipal,
            @RequestParam(value = "autresDocuments", required = false) MultipartFile autresDocuments,
            @RequestParam("investigateurs") String autresInvestigateursJson) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String email = jwt.getSubject();
            UserDetails userDetails = userService.loadUserByUsername(email);
            ApplicationUser applicationUser = (ApplicationUser) userDetails;
            System.out.println(descriptifProjet);
            Projet nouveauProjet = new Projet();
            nouveauProjet.setIntituleProjet(intituleProjet);
            nouveauProjet.setDureeEtude(dureeEtude);
            nouveauProjet.setTypeConsentement(typeConsentement);
            nouveauProjet.setPopulationCible(populationCible);
            nouveauProjet.setTypesDonnees(typesDonnees);
            nouveauProjet.setPrelevement(prelevement);
            nouveauProjet.setTypePrelevement(typePrelevement);
            nouveauProjet.setQuantitePrelevement(quantitePrelevement);
            nouveauProjet.setSourcefinancement(sourceFinancement);
            nouveauProjet.setProgrammeEmploiFinancement(programmeEmploiFinancement);
            nouveauProjet.setStatut("nouveau");
            // Handle file uploads
            if (descriptifProjet != null && !descriptifProjet.isEmpty()) {
                nouveauProjet.setDescriptifProjet(saveFile(descriptifProjet));
            }
            if (considerationEthique != null && !considerationEthique.isEmpty()) {
                nouveauProjet.setConsiderationEthique(saveFile(considerationEthique));
            }
            if (ficheInformationArabe != null && !ficheInformationArabe.isEmpty()) {
                nouveauProjet.setFicheInformationArabe(saveFile(ficheInformationArabe));
            }
            if (ficheInformationFrancais != null && !ficheInformationFrancais.isEmpty()) {
                nouveauProjet.setFicheInformationFrancais(saveFile(ficheInformationFrancais));
            }
            if (ficheConsentementFrancais != null && !ficheConsentementFrancais.isEmpty()) {
                nouveauProjet.setFicheConsentementFrancais(saveFile(ficheConsentementFrancais));
            }
            if (ficheConsentementArabe != null && !ficheConsentementArabe.isEmpty()) {
                nouveauProjet.setFicheConsentementArabe(saveFile(ficheConsentementArabe));
            }
            if (attestationEngagement != null && !attestationEngagement.isEmpty()) {
                nouveauProjet.setAttestationEngagement(saveFile(attestationEngagement));
            }
            if (attestationCNDP != null && !attestationCNDP.isEmpty()) {
                nouveauProjet.setAttestationCNDP(saveFile(attestationCNDP));
            }
            if (cvInvestigateurPrincipal != null && !cvInvestigateurPrincipal.isEmpty()) {
                nouveauProjet.setCvInvestigateurPrincipal(saveFile(cvInvestigateurPrincipal));
            }
            if (autresDocuments != null && !autresDocuments.isEmpty()) {
                nouveauProjet.setAutresDocuments(saveFile(autresDocuments));
            }

            nouveauProjet.setInvestigateur(applicationUser);

            Projet savedProjet = projetRepository.save(nouveauProjet);

            // Deserialize JSON string to List<AutreInvestigateurDto>
            ObjectMapper objectMapper = new ObjectMapper();
            List<AutreInvestigateurDto> autresInvestigateurs;
            try {
                autresInvestigateurs = objectMapper.readValue(autresInvestigateursJson, new TypeReference<List<AutreInvestigateurDto>>() {});
            } catch (IOException e) {
                System.err.println("Error parsing JSON: " + e.getMessage());
                return new ResponseEntity<>("Error parsing JSON: " + e.getMessage(), HttpStatus.BAD_REQUEST);
            }

            // Save other investigators
            if (autresInvestigateurs != null) {
                for (AutreInvestigateurDto autreInvestigateurDto : autresInvestigateurs) {
                    AutreInvestigateur autreInvestigateur = new AutreInvestigateur();
                    autreInvestigateur.setNom(autreInvestigateurDto.getNom());
                    autreInvestigateur.setPrenom(autreInvestigateurDto.getPrenom());
                    autreInvestigateur.setTitre(autreInvestigateurDto.getTitre());
                    autreInvestigateur.setEmail(autreInvestigateurDto.getEmail());
                    autreInvestigateur.setAffiliation(autreInvestigateurDto.getAffiliation());
                    autreInvestigateur.setAdresse(autreInvestigateurDto.getAdresse());
                    autreInvestigateur.setProjet(savedProjet);
                    autreInvestigateurRepository.save(autreInvestigateur);
                }
            }

            return new ResponseEntity<>(savedProjet, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Error saving files", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private byte[] saveFile(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            return file.getBytes(); // Read file content into byte array
        }
        return null;
    }


    // ediiiit
    @PutMapping("/{projectId}/edit")
    public ResponseEntity<?> updateProjet(
            @PathVariable Long projectId,
            @RequestParam("intituleProjet") String intituleProjet,
            @RequestParam("dureeEtude") String dureeEtude,
            @RequestParam("typeConsentement") String typeConsentement,
            @RequestParam("populationCible") String populationCible,
            @RequestParam("typesDonnees") String typesDonnees,
            @RequestParam("prelevement") boolean prelevement,
            @RequestParam("typePrelevement") String typePrelevement,
            @RequestParam("quantitePrelevement") String quantitePrelevement,
            @RequestParam("sourceFinancement") String sourceFinancement,
            @RequestParam("programmeEmploiFinancement") String programmeEmploiFinancement,
            @RequestParam(value = "descriptifProjet", required = false) MultipartFile descriptifProjet,
            @RequestParam(value = "considerationEthique", required = false) MultipartFile considerationEthique,
            @RequestParam(value = "ficheInformationArabe", required = false) MultipartFile ficheInformationArabe,
            @RequestParam(value = "ficheInformationFrancais", required = false) MultipartFile ficheInformationFrancais,
            @RequestParam(value = "ficheConsentementArabe", required = false) MultipartFile ficheConsentementArabe,
            @RequestParam(value = "ficheConsentementFrancais", required = false) MultipartFile ficheConsentementFrancais,
            @RequestParam(value = "attestationEngagement", required = false) MultipartFile attestationEngagement,
            @RequestParam(value = "attestationCNDP", required = false) MultipartFile attestationCNDP,
            @RequestParam(value = "cvInvestigateurPrincipal", required = false) MultipartFile cvInvestigateurPrincipal,
            @RequestParam(value = "autresDocuments", required = false) MultipartFile autresDocuments,
            @RequestParam("investigateurs") String autresInvestigateursJson) {
        try {
            // Fetch the existing project from repository
            Optional<Projet> optionalProjet = projetRepository.findById(projectId);
            if (!optionalProjet.isPresent()) {
                return new ResponseEntity<>("Project not found", HttpStatus.NOT_FOUND);
            }
            Projet existingProjet = optionalProjet.get();

            // Update project details
            existingProjet.setIntituleProjet(intituleProjet);
            existingProjet.setDureeEtude(dureeEtude);
            existingProjet.setTypeConsentement(typeConsentement);
            existingProjet.setPopulationCible(populationCible);
            existingProjet.setTypesDonnees(typesDonnees);
            existingProjet.setPrelevement(prelevement);
            existingProjet.setTypePrelevement(typePrelevement);
            existingProjet.setQuantitePrelevement(quantitePrelevement);
            existingProjet.setSourcefinancement(sourceFinancement);
            existingProjet.setProgrammeEmploiFinancement(programmeEmploiFinancement);

            // Handle file uploads

            existingProjet.setDescriptifProjet(saveFile(descriptifProjet));


            existingProjet.setConsiderationEthique(saveFile(considerationEthique));


            existingProjet.setFicheInformationArabe(saveFile(ficheInformationArabe));


            existingProjet.setFicheInformationFrancais(saveFile(ficheInformationFrancais));


            existingProjet.setFicheConsentementArabe(saveFile(ficheConsentementArabe));


            existingProjet.setFicheConsentementFrancais(saveFile(ficheConsentementFrancais));


            existingProjet.setAttestationEngagement(saveFile(attestationEngagement));


            existingProjet.setAttestationCNDP(saveFile(attestationCNDP));


            existingProjet.setCvInvestigateurPrincipal(saveFile(cvInvestigateurPrincipal));


            existingProjet.setAutresDocuments(saveFile(autresDocuments));

                existingProjet.setStatut("torevised");

            // Repeat for other files...

            // Save updated project
            Projet savedProjet = projetRepository.save(existingProjet);

            // Deserialize JSON string to List<AutreInvestigateurDto>
            ObjectMapper objectMapper = new ObjectMapper();
            List<AutreInvestigateurDto> autresInvestigateurs;
            try {
                autresInvestigateurs = objectMapper.readValue(autresInvestigateursJson, new TypeReference<List<AutreInvestigateurDto>>() {});
            } catch (IOException e) {
                System.err.println("Error parsing JSON: " + e.getMessage());
                return new ResponseEntity<>("Error parsing JSON: " + e.getMessage(), HttpStatus.BAD_REQUEST);
            }

            // Update other investigators


            if (autresInvestigateurs != null) {
                for (AutreInvestigateurDto autreInvestigateurDto : autresInvestigateurs) {
                    AutreInvestigateur autreInvestigateur = new AutreInvestigateur();
                    autreInvestigateur.setNom(autreInvestigateurDto.getNom());
                    autreInvestigateur.setPrenom(autreInvestigateurDto.getPrenom());
                    autreInvestigateur.setTitre(autreInvestigateurDto.getTitre());
                    autreInvestigateur.setEmail(autreInvestigateurDto.getEmail());
                    autreInvestigateur.setAffiliation(autreInvestigateurDto.getAffiliation());
                    autreInvestigateur.setAdresse(autreInvestigateurDto.getAdresse());
                    autreInvestigateur.setProjet(savedProjet);
                    autreInvestigateurRepository.save(autreInvestigateur);
                }
            }

            return new ResponseEntity<>(savedProjet, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error saving files", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
