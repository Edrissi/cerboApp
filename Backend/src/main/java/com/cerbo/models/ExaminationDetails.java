package com.cerbo.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
@Entity

public class ExaminationDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateExamination;

    @ManyToOne
    @JoinTable(
            name="examination_projet_junction",
            joinColumns = {@JoinColumn(name="projet_id")},
            inverseJoinColumns = {@JoinColumn(name="examination_details_id")}
    )
    private Projet projetExamine;

    @OneToMany
    @JoinTable(
            name="examination_commentaire_junction",
            joinColumns = {@JoinColumn(name="commentaire_id")},
            inverseJoinColumns = {@JoinColumn(name="examination_details_id")}
    )
    private Set<Commentaire> commentaires;




}
