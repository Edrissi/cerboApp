package com.cerbo.repository;

import com.cerbo.models.CodeRegistrationInvistigateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodeRegistrationInviInterface extends JpaRepository<CodeRegistrationInvistigateur, Integer> {
    void deleteByCode(String code);

    Optional<CodeRegistrationInvistigateur> findByCode(String code);
}
