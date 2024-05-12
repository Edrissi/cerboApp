package com.cerbo.repository;


import com.cerbo.models.BlackListJwt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlackListJwtRepository extends JpaRepository<BlackListJwt,Integer> {

    boolean existsByToken(String token);

    void deleteByToken(String token);
}
