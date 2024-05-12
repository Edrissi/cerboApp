package com.cerbo.Dto;

import lombok.Data;

@Data
public class RegistrationDTO {
    private String email;
    private String password;
    private String nom;
    private String prenom;
    private String titre;
    private String affilliation;
    private String specialite;
    private String adresse;
    private String codeRegistration;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String username, String password){
        super();
        this.email = username;
        this.password = password;
    }

    public String getEmail(){
        return this.email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String toString(){
        return "Registration info: username: " + this.email + " password: " + this.password;
    }
}
