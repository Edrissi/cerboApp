package com.cerbo.services;
import com.cerbo.Dto.ReunionDto;
import com.cerbo.Dto.ReunionReqDTO;
import com.cerbo.models.ApplicationUser;

import com.cerbo.models.Projet;
import com.cerbo.models.Reunion;
import com.cerbo.repository.ProjetRepository;
import com.cerbo.repository.ReunionRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReunionService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ReunionRepository reunionReopository;

    @Autowired
    private UserRepository userRepository;

    public String ajouterProjetAuReunion(ReunionReqDTO reunionReqDTO, Long id){

        Projet projet;
        projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Projet not found"));

        // ajouter ref
        projet.setRef("555/55");

        //ajouter dernier date examination
        LocalDate datenow = LocalDate.now();
        projet.setPremiereExamination(datenow);

        //changer statut apres revision
        projet.setStatut(reunionReqDTO.getStatut());
        projetRepository.save(projet);

        List<Reunion> reunionsDansLeMemeMois = reunionReopository.findByDate(reunionReqDTO.getDate());

        Reunion reunion;

        if (!reunionsDansLeMemeMois.isEmpty()) {

            reunion = reunionsDansLeMemeMois.get(0);
            reunion.getProjets().add(projet);

            for (ApplicationUser user : reunionReqDTO.getMembersPresent()) {
                ApplicationUser user_n = userRepository.findById(user.getUserId()).orElseThrow(() -> new RuntimeException("user not found"));
                setLastMeet(reunionReqDTO.getDate(), user_n);

            }

            reunionReopository.save(reunion);


            return "Reunion deja existe , et le projet ajouter au reunion avec success";
            }




         else {
            // Créer une nouvelle réunion
            reunion = new Reunion();
            reunion.setDate(reunionReqDTO.getDate()); // Vous pouvez définir une autre date si nécessaire
            reunion.getProjets().add(projet);


            for (ApplicationUser user : reunionReqDTO.getMembersPresent()) {

                    ApplicationUser user_n = userRepository.findById(user.getUserId()).orElseThrow(() -> new RuntimeException("user not found"));
                    setLastMeet(reunionReqDTO.getDate(), user_n);
                    reunion.getMembresPresents().add(user);

            }
            reunionReopository.save(reunion);
            return "Reunion Crée, et projet ajouter au reunion avec success";
        }
    }
    public void setLastMeet(YearMonth lastMeet,ApplicationUser user) {
        user.setLastMeet(lastMeet);
        userRepository.save(user);

    }

    public List<ReunionDto> getReunions(){
        List<Reunion> reunions = reunionReopository.findAll();

        List<ReunionDto> reunionsDto = reunions.stream()
                .map(this::mapReunionToDTO)
                .collect(Collectors.toList());


        return reunionsDto;
    }

    private ReunionDto mapReunionToDTO(Reunion reunion) {
        ReunionDto dto = new ReunionDto();
        dto.setReunionsId(reunion.getId());
        dto.setMonthYearOfReunion(reunion.getDate());
        return dto;
    }
}
