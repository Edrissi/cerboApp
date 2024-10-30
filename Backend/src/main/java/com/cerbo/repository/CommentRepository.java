package com.cerbo.repository;


import com.cerbo.models.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CommentRepository extends JpaRepository<Commentaire,Long> {
    List<Commentaire> findByProjetId(Long projetId);
    List<Commentaire> findByProjetIdAndFileComment(Long projetId,String commentFile);
    List<Commentaire> findByProjetIdAndFileCommentAndOldComment(Long projetId,String commentFile,boolean oldComment);
    List<Commentaire> findByProjetIdAndStatut(Long projetId,boolean statut);
    Set<Commentaire> findByProjetIdAndOldComment(Long projetId,boolean oldComment);
    Set<Commentaire> findByProjetIdAndOldCommentAndStatut(Long projetId,boolean oldComment,boolean statut);



}
