package com.cerbo.services;


import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Projet;
import com.cerbo.models.Reunion;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.ReunionReopository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class ReunionService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ReunionReopository reunionReopository;

    public String ajouterProjetAuReunion(YearMonth date, List<ApplicationUser> users,Long id){

        Projet projet;
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));



        List<Reunion> reunionsDansLeMemeMois = reunionReopository.findByDate(date);

        Reunion reunion;

        if (!reunionsDansLeMemeMois.isEmpty()) {

            reunion = reunionsDansLeMemeMois.get(0);
            reunion.getProjets().add(projet);
            reunionReopository.save(reunion);

            return "Reunion deja existe , et le projet ajouter au reunion avec success";
        } else {
            // Créer une nouvelle réunion
            reunion = new Reunion();
            reunion.setDate(date); // Vous pouvez définir une autre date si nécessaire
            reunion.getProjets().add(projet);


            for (ApplicationUser user : users) {
                reunion.getMembresPresents().add(user);
            }
            reunionReopository.save(reunion);
            return "Reunion Crée, et projet ajouter au reunion avec success";
        }







    }
}
