package com.cerbo.Dto;


import lombok.Data;

@Data
public class CommentaireUpdateDTO {
    private Long id;
    private boolean statut;

    public Boolean getStatut() {
        return statut;
    }
}
