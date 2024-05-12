package com.cerbo.repository;


import com.cerbo.models.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {
    @Override
    List<Projet> findAll();

    @Override
    Optional<Projet> findById(Long aLong);
}
