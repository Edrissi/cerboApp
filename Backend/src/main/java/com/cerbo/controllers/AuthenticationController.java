package com.cerbo.controllers;

import com.cerbo.Dto.LoginRequestDTO;
import com.cerbo.Dto.LoginResponseDTO;
import com.cerbo.Dto.RegistrationDTO;
import com.cerbo.Dto.ResetPasswordRequest;
import com.cerbo.models.*;
import com.cerbo.services.BlackListJwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/send-code-reset-password")
    public ResponseEntity<?> sendCodeResetPassword(@RequestParam("email") String email) {
        try {
            authenticationService.sendCodeResetPassword(email);
            return ResponseEntity.ok("Code sent successfully to " + email);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while sending the code", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest body) {
        try {
            return authenticationService.resetPassword(body);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while resetting the password", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}   
