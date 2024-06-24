package com.cerbo.repository;

import com.cerbo.models.CodeRegistrationInvistigateur;
import com.cerbo.models.CodeRegistrationMembre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CodeRegMembreInterface extends JpaRepository<CodeRegistrationMembre,Integer> {

    Optional<CodeRegistrationMembre> findByCode(String Code);
    void deleteByCode(String code);
    Optional<CodeRegistrationMembre> findByCodeAndEmailUser(String code , String email);

}
