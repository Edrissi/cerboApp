package com.cerbo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reset_password_code")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResetPasswordCode {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String email;
    private String code;
    private LocalDateTime createdAt;
    public ResetPasswordCode(Long id, String email, String code) {
        this.id = id;
        this.email = email;
        this.code = code;
        this.createdAt = LocalDateTime.now();  // Ajoute l'heure de création
    }
}
