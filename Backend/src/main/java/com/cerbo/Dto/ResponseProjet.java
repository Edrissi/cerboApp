package com.cerbo.Dto;

import com.cerbo.models.ApplicationUser;
import lombok.Data;

@Data
public class ResponseProjet {
    private Integer id;
    private ApplicationUser invistigateur;
    private String intituleProjet;
    private String durreEtude;
}
