package com.cerbo.models;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="commentaire")

public class Commentaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private ApplicationUser applicationUser;

    @Column(name = "commentaire",length = 2000)
    private String commentaire;

    @Column(name = "statut" )
    private boolean statut;

    @Column(name="file_comment")
    private String fileComment;
}
