package com.cerbo.services;

import com.cerbo.models.ApplicationUser;
import com.cerbo.models.ResetPasswordCode;
import com.cerbo.repository.ResetPasswordCodeRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserRepository userRepository;

    @Scheduled(fixedRate = 60000)  // Exécuter cette tâche toutes les 60 secondes
    public void cleanupExpiredCodes() {
        LocalDateTime expirationTime = LocalDateTime.now().minusMinutes(10);
        List<ResetPasswordCode> expiredCodes = resetPasswordCodeRepository.findByCreatedAtBefore(expirationTime);

        if (!expiredCodes.isEmpty()) {  // Vérifie si la liste n'est pas vide
            resetPasswordCodeRepository.deleteAll(expiredCodes);
        }
    }
    @Scheduled(cron = "0 0 0 1 1 *")
    public void resetNumberOfAbsences() {
        List<ApplicationUser> users = userRepository.findAll();
        for (ApplicationUser user : users) {
            user.setNumberOfAbsencesPerYear(0);
        }
        try {
            userRepository.saveAll(users);
        } catch (Exception e) {
            System.err.println("Erreur lors de la sauvegarde des utilisateurs : " + e.getMessage());
        }
    }


}
