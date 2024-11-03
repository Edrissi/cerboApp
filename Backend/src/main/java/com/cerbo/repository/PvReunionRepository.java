package com.cerbo.repository;

import com.cerbo.models.PvReunion;
import com.cerbo.models.Reunion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PvReunionRepository extends JpaRepository<PvReunion, Long> {

    Optional<List<PvReunion>> findByReunion(Reunion reunion);
}
