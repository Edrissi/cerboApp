package com.cerbo.repository;


import com.cerbo.models.Reunion;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface ReunionRepository extends JpaRepository<Reunion, Long> {

    List<Reunion> findByDate(YearMonth date);
    List<Reunion> findAll();
    Reunion findById(long id);

}
