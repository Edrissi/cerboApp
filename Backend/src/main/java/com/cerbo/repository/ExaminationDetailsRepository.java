package com.cerbo.repository;


import com.cerbo.models.ExaminationDetails;
import com.cerbo.models.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExaminationDetailsRepository extends JpaRepository<ExaminationDetails, Integer> {

    List<ExaminationDetails> findByProjetExamine(Projet projet);


}
