
package com.cerbo.controllers;


import com.cerbo.Dto.AutreInvestigateurDto;
import com.cerbo.Dto.ExaminationDetailsDTO;
import com.cerbo.Dto.ProjetDTO;
import com.cerbo.Dto.ProjetDetailsDto;
import com.cerbo.Dto.ProjetRequestDto;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.AutreInvestigateur;
import com.cerbo.models.Projet;
import com.cerbo.repository.AutreInvestigateurRepository;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.services.ExaminationService;
import com.cerbo.services.ProjetService;
import com.cerbo.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nullable;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
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
    @Autowired
    private ExaminationService examinationService;

    @GetMapping("/projects")
    public List<ProjetDTO> getAllProjects() {
        return projetService.getAllProjects();
    }

    @GetMapping("/projet/{id}")
    public ProjetDetailsDto getProjet(@PathVariable Long id) {
        return projetService.getDetailsProjet(id);

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
            @ModelAttribute ProjetRequestDto body,
            @RequestParam("descriptifProjet")@Nullable MultipartFile descriptifProjet,
            @RequestParam("considerationEthique") @Nullable MultipartFile considerationEthique,
            @RequestParam("ficheInformationArabe")@Nullable MultipartFile ficheInformationArabe,
            @RequestParam("ficheInformationFrancais")@Nullable MultipartFile ficheInformationFrancais,
            @RequestParam("ficheConsentementFrancais")@Nullable MultipartFile ficheConsentementFrancais,
            @RequestParam("ficheConsentementArabe")@Nullable MultipartFile ficheConsentementArabe,
            @RequestParam("attestationEngagement")@Nullable MultipartFile attestationEngagement,
            @RequestParam("attestationCNDP")@Nullable MultipartFile attestationCNDP,
            @RequestParam("cvInvestigateurPrincipal")@Nullable MultipartFile cvInvestigateurPrincipal,
            @RequestParam("autresDocuments")@Nullable MultipartFile autresDocuments

    ) throws IOException {
        try {
            projetService.enregistrerProjet(body, descriptifProjet, considerationEthique, ficheInformationArabe, ficheInformationFrancais, ficheConsentementFrancais, ficheConsentementArabe, attestationEngagement, attestationCNDP, cvInvestigateurPrincipal,autresDocuments);
            return new ResponseEntity<>("save projet", HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Error saving files", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    // ediiiit
    @PutMapping("/edit/{projectId}")
    public ResponseEntity<?> updateProjet(  @PathVariable Long projectId,
                                            @ModelAttribute ProjetRequestDto body,
                                            @RequestParam("descriptifProjet")@Nullable MultipartFile descriptifProjet,
                                            @RequestParam("considerationEthique") @Nullable MultipartFile considerationEthique,
                                            @RequestParam("ficheInformationArabe")@Nullable MultipartFile ficheInformationArabe,
                                            @RequestParam("ficheInformationFrancais")@Nullable MultipartFile ficheInformationFrancais,
                                            @RequestParam("ficheConsentementFrancais")@Nullable MultipartFile ficheConsentementFrancais,
                                            @RequestParam("ficheConsentementArabe")@Nullable MultipartFile ficheConsentementArabe,
                                            @RequestParam("attestationEngagement")@Nullable MultipartFile attestationEngagement,
                                            @RequestParam("attestationCNDP")@Nullable MultipartFile attestationCNDP,
                                            @RequestParam("cvInvestigateurPrincipal")@Nullable MultipartFile cvInvestigateurPrincipal,
                                            @RequestParam("autresDocuments")@Nullable MultipartFile autresDocuments

    ){
        try {
            projetService.updateProject(projectId ,body, descriptifProjet, considerationEthique, ficheInformationArabe, ficheInformationFrancais, ficheConsentementFrancais, ficheConsentementArabe, attestationEngagement, attestationCNDP, cvInvestigateurPrincipal,autresDocuments);
            return new ResponseEntity<>("update project", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error saving files", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/rapports/{projet_id}")
    public List<ExaminationDetailsDTO> getRapports(@PathVariable Long projet_id){
        return examinationService.getExaminationDetailsForRapport(projet_id);

    }





}
