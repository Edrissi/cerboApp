package com.cerbo.repository;

import com.cerbo.models.ApplicationUser;
import com.cerbo.models.ProjetValide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetValideRepository extends JpaRepository<ProjetValide, Long> {
    @Override
    List<ProjetValide> findAll();

    @Override
    Optional<ProjetValide> findById(Long aLong);

    List<ProjetValide> findByInvestigateur(ApplicationUser applicationUser);
}
