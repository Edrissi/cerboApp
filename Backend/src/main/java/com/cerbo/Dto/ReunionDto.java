package com.cerbo.Dto;

import com.cerbo.models.ApplicationUser;
import lombok.Data;

import java.time.YearMonth;
import java.util.List;

@Data
public class ReunionDto {
    private Long reunionsId;
    private YearMonth monthYearOfReunion;
    private List<ProjetDTO> projectsExaminated;
    private List<ApplicationUser> membersPresent;
}
