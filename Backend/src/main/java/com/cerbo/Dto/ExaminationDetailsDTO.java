package com.cerbo.Dto;


import com.cerbo.models.Commentaire;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
public class ExaminationDetailsDTO {
    private Long examinationId;
    private LocalDate examinationDate;
    private List<CommentDTO> commentaires;
}
