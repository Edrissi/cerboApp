package com.cerbo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pv_reunion")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PvReunion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPvReunion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Reunion reunion;

    private String cerboReference;

    private String decision;

    private boolean isNew;

}
