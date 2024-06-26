package com.cerbo.repository;

import com.cerbo.models.AutreInvestigateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AutreInvestigateurRepository extends JpaRepository<AutreInvestigateur, Long> {
    @Override
    List<AutreInvestigateur> findAll();

    @Override
    Optional<AutreInvestigateur> findById(Long aLong);
}
