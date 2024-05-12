package com.cerbo.models;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "blacklist")
public class BlackListJwt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(length = 2000,unique = true)
    private String token;

}
