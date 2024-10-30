package com.cerbo.services;

import com.cerbo.models.ResetPasswordCode;
import com.cerbo.repository.ResetPasswordCodeRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResetPasswordCodeCleanupService {

    private final ResetPasswordCodeRepository resetPasswordCodeRepository;

    public ResetPasswordCodeCleanupService(ResetPasswordCodeRepository resetPasswordCodeRepository) {
        this.resetPasswordCodeRepository = resetPasswordCodeRepository;
    }

    @Scheduled(fixedRate = 60000)  // Exécuter cette tâche toutes les 60 secondes
    public void cleanupExpiredCodes() {
        LocalDateTime expirationTime = LocalDateTime.now().minusMinutes(10);
        List<ResetPasswordCode> expiredCodes = resetPasswordCodeRepository.findByCreatedAtBefore(expirationTime);

        if (!expiredCodes.isEmpty()) {  // Vérifie si la liste n'est pas vide
            resetPasswordCodeRepository.deleteAll(expiredCodes);
        }
    }

}
