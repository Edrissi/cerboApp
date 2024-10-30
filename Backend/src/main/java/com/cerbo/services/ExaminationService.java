package com.cerbo.services;


import com.cerbo.Dto.CommentDTO;
import com.cerbo.Dto.ExaminationDetailsDTO;
import com.cerbo.models.Commentaire;
import com.cerbo.models.ExaminationDetails;
import com.cerbo.models.Projet;
import com.cerbo.repository.CommentRepository;
import com.cerbo.repository.ExaminationDetailsRepository;
import com.cerbo.repository.ProjetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ExaminationService {

    @Autowired
    private ExaminationDetailsRepository examinationDetailsRepository;
    @Autowired
    private ProjetRepository projetRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentaireService commentaireService;

    // ajouter les commentaires valider au table ExaminationDetails
    public void ajouter_commentaires_examination(Long projet_id){

        ExaminationDetails examinationDetails =new ExaminationDetails();
        Projet projet = projetRepository.findById(projet_id).orElseThrow(() -> new RuntimeException("projet not found"));

        LocalDate dateExamination = LocalDate.now();

        Set<Commentaire> commentaires = new HashSet<>();
        commentaires = commentRepository.findByProjetIdAndOldCommentAndStatut(projet_id, false,true);


        examinationDetails.setDateExamination(dateExamination);
        examinationDetails.setCommentaires(commentaires);
        examinationDetails.setProjetExamine(projet);

        commentaireService.changeOldStatut(projet_id);

        examinationDetailsRepository.save(examinationDetails);


    }

    public List<ExaminationDetailsDTO> getExaminationDetailsForRapport(Long projet_id){

        Projet projet = projetRepository.findById(projet_id).orElseThrow(() -> new RuntimeException("projet not found"));
        List<ExaminationDetails> examinationDetails = examinationDetailsRepository.findByProjetExamine(projet);


        return examinationDetails.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

    }

    private ExaminationDetailsDTO mapToDTO(ExaminationDetails examinationDetails) {
        ExaminationDetailsDTO dto = new ExaminationDetailsDTO();
        dto.setExaminationId(examinationDetails.getId());
        dto.setExaminationDate(examinationDetails.getDateExamination());

        List<CommentDTO> commentDTO = examinationDetails
                .getCommentaires()
                .stream()
                .map(this::mapToDTOComment)
                        .collect(Collectors.toList());
        System.out.print(commentDTO);
        dto.setCommentaires(commentDTO);
        return dto;
    }

    private CommentDTO mapToDTOComment(Commentaire commentaire) {
        CommentDTO dto = new CommentDTO();

        dto.setFileComment(commentaire.getFileComment());
        dto.setCommentaire(commentaire.getCommentaire());
        System.out.println(commentaire.getCommentaire());

        return dto;
    }




}
