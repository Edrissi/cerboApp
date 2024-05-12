package com.cerbo.controllers;

import com.cerbo.Dto.LoginRequestDTO;
import com.cerbo.Dto.LoginResponseDTO;
import com.cerbo.Dto.RegistrationDTO;
import com.cerbo.models.*;
import com.cerbo.services.BlackListJwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cerbo.services.AuthenticationService;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/auth")


public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private BlackListJwtService blackListJwtService;

    @PostMapping("/register/memb")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(
                body.getCodeRegistration(),
                body.getEmail(),
                body.getPassword(),
                body.getSpecialite(),
                body.getAffilliation(),
                body.getTitre(),
                body.getNom(),
                body.getPrenom());
    }

    @PostMapping("/register/invi")
    public ResponseEntity<String> registerUserInvi(@RequestBody RegistrationDTO body){
        return authenticationService.registerUserInvi(
                body.getCodeRegistration(),
                body.getEmail(),
                body.getPassword(),
                body.getSpecialite(),
                body.getAdresse(),
                body.getTitre(),
                body.getNom(),
                body.getPrenom());
    }
    
    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO body){
        return authenticationService.loginUser(body.getEmail(), body.getPassword());
    }

//    @PostMapping("/register-verify")
//    public ResponseEntity<String> verifyUser(){
//
//    }

}   
