package com.cerbo.repository;


import com.cerbo.models.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Commentaire,Long> {
    List<Commentaire> findByProjetId(Long projetId);
    List<Commentaire> findByProjetIdAndFileComment(Long projetId,String commentFile);
    List<Commentaire> findByProjetIdAndStatut(Long projetId,boolean statut);

}
