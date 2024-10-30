package com.cerbo.repository;

import com.cerbo.models.ResetPasswordCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ResetPasswordCodeRepository extends JpaRepository<ResetPasswordCode, Long> {
    List<ResetPasswordCode> findByCreatedAtBefore(LocalDateTime time);
    Optional<ResetPasswordCode> findByEmail(String email);
    void deleteByEmail(String email);
}
