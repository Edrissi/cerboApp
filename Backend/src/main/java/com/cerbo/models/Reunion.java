package com.cerbo.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
@Table(name="Reunion")

public class Reunion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private YearMonth date;


    @ManyToMany
    @JoinTable(
            name = "presence_reunion",
            joinColumns = @JoinColumn(name = "reunion_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> membresPresents = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "projets_reunion",
            joinColumns = @JoinColumn(name = "reunion_id"),
            inverseJoinColumns = @JoinColumn(name = "projet_id")
    )
    private Set<Projet> projets = new HashSet<>();

}
