package com.cerbo.services;

import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Commentaire;
import com.cerbo.models.Projet;
import com.cerbo.repository.CommentRepository;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public class CommentaireService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private UserRepository userRepository;


    public Commentaire addCommentaire(Long projetId , Integer userId , String comment ,String fileComment){

        Projet projet = projetRepository.findById(projetId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid project ID: " + projetId));
        ApplicationUser applicationUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        Commentaire newComment = new Commentaire();
        newComment.setProjet(projet);
        newComment.setApplicationUser(applicationUser);
        System.out.println(comment);
        newComment.setCommentaire(comment);
        newComment.setFileComment(fileComment);
        newComment.setStatut(false); // Default status

        return commentRepository.save(newComment);
    }

    public List<Commentaire> getAllCommentByProject(Long id){
        return commentRepository.findByProjetId(id);

    }

    public List<Commentaire> getAllCommentByProjectAndFile(Long id,String fileComment){
        return commentRepository.findByProjetIdAndFileCommentAndOldComment(id,fileComment,false);

    }

    public List<Commentaire> getAllCommentValid(Long id,boolean statut){
        return commentRepository.findByProjetIdAndStatut(id,statut);
    }

    public Commentaire updateCommentStatus(Long id, Boolean statut) {
        Commentaire comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setStatut(statut);
        return commentRepository.save(comment);


    }

    public void changeOldStatut(Long projet_id){

        Set<Commentaire> commentaires = commentRepository.findByProjetIdAndOldComment(projet_id,false);
        commentaires.forEach(comment -> {
            comment.setOldComment(true);
            commentRepository.save(comment);
            });

    }



}
