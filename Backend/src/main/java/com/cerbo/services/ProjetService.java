package com.cerbo.services;


import com.cerbo.Dto.AutreInvestigateurDto;
import com.cerbo.Dto.ProjetDTO;
import com.cerbo.Dto.ProjetDetailsDto;
import com.cerbo.Dto.ProjetRequestDto;
import com.cerbo.mapper.ProjectMapper;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.models.ProjetValide;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.ProjetValideRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static com.cerbo.mapper.ProjectMapper.convertMultipartFileToByteArray;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ProjetValideRepository projetValideRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired AutreInvestigateurService autreInvestigateurService;
    @Autowired
    private EmailService emailService;


    public void enregistrerProjet(ProjetRequestDto projetRequestDto, MultipartFile descriptifProjet, MultipartFile considerationEthique, MultipartFile ficheInformationArabe, MultipartFile ficheInformationFrancais, MultipartFile ficheConsentementFrancais, MultipartFile ficheConsentementArabe, MultipartFile attestationEngagement, MultipartFile attestationCNDP, MultipartFile cvInvestigateurPrincipal, MultipartFile autresDocuments) throws IOException {

        ApplicationUser user = tokenService.getApplicationUserFromToken();

        Projet projet = projectMapper.mapToEntity(projetRequestDto, descriptifProjet, considerationEthique, ficheInformationArabe, ficheInformationFrancais, ficheConsentementFrancais, ficheConsentementArabe, attestationEngagement, attestationCNDP, cvInvestigateurPrincipal,autresDocuments);
        projet.setInvestigateur(user);
        projet.setDateSoumission(LocalDate.now());
        projet.setStatut("nouveau");

        String referenceProjet = genererReferenceProjet();
        projet.setRef(referenceProjet);

        Projet savedProject = projetRepository.save(projet);

        List<AutreInvestigateurDto> autreInvestigateurDtoList = projetRequestDto.getAutreInvestigateurDtos();

        // Filtrer les investigateurs vides avant de les enregistrer
        if (autreInvestigateurDtoList != null) {
            List<AutreInvestigateurDto> validInvestigateurs = autreInvestigateurDtoList.stream()
                    .filter(inv -> inv != null && !inv.getNom().isEmpty() && !inv.getPrenom().isEmpty())
                    .collect(Collectors.toList());
            if (!validInvestigateurs.isEmpty()) {
                autreInvestigateurService.saveAutreInvestigateur(validInvestigateurs, savedProject);
            }
        }

        emailService.sendProjectInfos(user.getEmail(), "Création du Projet Réussie", savedProject.getIntituleProjet(), savedProject.getRef());
    }

    public void updateProject(Long projectId,ProjetRequestDto projetRequestDto, MultipartFile descriptifProjet, MultipartFile considerationEthique, MultipartFile ficheInformationArabe, MultipartFile ficheInformationFrancais, MultipartFile ficheConsentementFrancais, MultipartFile ficheConsentementArabe, MultipartFile attestationEngagement, MultipartFile attestationCNDP, MultipartFile cvInvestigateurPrincipal, MultipartFile autresDocuments) throws IOException {

        ApplicationUser user = tokenService.getApplicationUserFromToken();

        Projet projet = projetRepository.findById(projectId).orElseThrow(
                () -> new RuntimeException("Porject not found")
        );

        projet.setInvestigateur(user);

        projet.setIntituleProjet(projetRequestDto.getIntituleProjet());
        projet.setDureeEtude(projetRequestDto.getDureeEtude());
        projet.setTypeConsentement(projetRequestDto.getTypeConsentement());
        projet.setPopulationCible(projetRequestDto.getPopulationCible());
        projet.setTypesDonnees(projetRequestDto.getTypesDonnees());
        projet.setPrelevement(projetRequestDto.isPrelevement());
        projet.setTypePrelevement(projetRequestDto.getTypePrelevement());
        projet.setQuantitePrelevement(projetRequestDto.getQuantitePrelevement());
        projet.setSourcefinancement(projetRequestDto.getSourceFinancement());
        projet.setProgrammeEmploiFinancement(projetRequestDto.getProgrammeEmploiFinancement());

        projet.setDescriptifProjet(null);
        if (descriptifProjet != null && !descriptifProjet.isEmpty()) {
            projet.setDescriptifProjet(convertMultipartFileToByteArray(descriptifProjet));
        }

        projet.setConsiderationEthique(null);
        if (considerationEthique != null && !considerationEthique.isEmpty()) {
            projet.setConsiderationEthique(convertMultipartFileToByteArray(considerationEthique));
        }

        projet.setFicheInformationArabe(null);
        if (ficheInformationArabe != null && !ficheInformationArabe.isEmpty()) {
            projet.setFicheInformationArabe(convertMultipartFileToByteArray(ficheInformationArabe));
        }

        projet.setFicheInformationFrancais(null);
        if (ficheInformationFrancais != null && !ficheInformationFrancais.isEmpty()) {
            projet.setFicheInformationFrancais(convertMultipartFileToByteArray(ficheInformationFrancais));
        }

        projet.setFicheConsentementArabe(null);
        if (ficheConsentementArabe != null && !ficheConsentementArabe.isEmpty()) {
            projet.setFicheConsentementArabe(convertMultipartFileToByteArray(ficheConsentementArabe));
        }

        projet.setFicheConsentementFrancais(null);
        if (ficheConsentementFrancais != null && !ficheConsentementFrancais.isEmpty()) {
            projet.setFicheConsentementFrancais(convertMultipartFileToByteArray(ficheConsentementFrancais));
        }

        projet.setAttestationEngagement(null);
        if (attestationEngagement != null && !attestationEngagement.isEmpty()) {
            projet.setAttestationEngagement(convertMultipartFileToByteArray(attestationEngagement));
        }

        projet.setAttestationCNDP(null);
        if (attestationCNDP != null && !attestationCNDP.isEmpty()) {
            projet.setAttestationCNDP(convertMultipartFileToByteArray(attestationCNDP));
        }

        projet.setCvInvestigateurPrincipal(null);
        if (cvInvestigateurPrincipal != null && !cvInvestigateurPrincipal.isEmpty()) {
            projet.setCvInvestigateurPrincipal(convertMultipartFileToByteArray(cvInvestigateurPrincipal));
        }

        projet.setAutresDocuments(null);
        if (autresDocuments != null && !autresDocuments.isEmpty()) {
            projet.setAutresDocuments(convertMultipartFileToByteArray(autresDocuments));
        }
        Projet savedProject = new Projet();
        try {
           savedProject = projetRepository.save(projet);
        }catch (Exception e){
            System.out.println("Il exist un problemme dans la mise a jour de projet");
            throw new RuntimeException(e.getMessage(), e.getCause());
        }
        List<AutreInvestigateurDto> autreInvestigateurDtoList = projetRequestDto.getAutreInvestigateurDtos();
        if (autreInvestigateurDtoList != null) {
            List<AutreInvestigateurDto> validInvestigateurs = autreInvestigateurDtoList.stream()
                    .filter(inv -> inv != null && !inv.getNom().isEmpty() && !inv.getPrenom().isEmpty())
                    .collect(Collectors.toList());
            if (!validInvestigateurs.isEmpty()) {
                autreInvestigateurService.saveAutreInvestigateur(validInvestigateurs, savedProject);
            }
        }
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
                        projet.getDernierExamination()))
                .collect(Collectors.toList());
    }

    public void ajouterReferenceEtFinDernierExamination(String ref, LocalDate date, Long id){
        Projet projet;
        LocalDate dateNow = LocalDate.now();
        String refe = "";
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));
        projet.setRef(ref);

        projet.setDernierExamination(dateNow);
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

    private String genererReferenceProjet() {
        int annee = LocalDate.now().getYear();
        int dernierNumeroProjet = getDernierNumeroProjet(annee);


            int nouveauNumero = (dernierNumeroProjet == 0) ? 100 : dernierNumeroProjet + 1;


        return String.format("%03d/%d", nouveauNumero, annee);
    }

    private int getDernierNumeroProjet(int annee) {
        Projet dernierProjet = projetRepository.findTopByRefEndingWith(String.valueOf(annee)).orElseThrow(
                ()-> new RuntimeException("Project not found")
        );
        if (dernierProjet != null) {
            String[] parts = dernierProjet.getRef().split("/");
            return Integer.parseInt(parts[0]);
        }
        return 0;
    }
}