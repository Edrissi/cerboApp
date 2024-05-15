package com.cerbo.controllers;

import com.cerbo.models.ApplicationUser;

import com.cerbo.repository.UserRepository;
import com.cerbo.services.AdminService;
import com.cerbo.services.BlackListJwtService;
import com.cerbo.services.CodeGeneratorService;
import com.cerbo.services.TokenService;

import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin")


public class AdminController {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminService adminService;
    @Autowired
    private BlackListJwtService blackListJwtService;
    @Autowired
    private CodeGeneratorService codeGeneratorService;


    //
    @GetMapping("/")
    public Boolean helloAdmineController(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String token_string = jwt.getTokenValue();

        return blackListJwtService.isTokenBlacklisted(token_string);

//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.isAuthenticated()) {
//            // Check if the principal is an instance of Jwt
//            if (authentication.getPrincipal() instanceof Jwt) {
//                // If the principal is Jwt, you can extract information directly from it
//                Jwt jwt = (Jwt) authentication.getPrincipal();
//                // Access the claims from the JWT token
//                String email = jwt.getSubject() ; // Assuming email is a claim in your JWT token
//                return email != null ? email : "Email not found in token";
//            } else {
//                return "Principal is not Jwt";
//            }
//        } else {
//            return "Not authenticated";
//        }

    }

    @GetMapping("/users")
    public List<ApplicationUser> getUsers(){
        return adminService.getMembre();
    }

    @GetMapping("/info/{id}")
    public ApplicationUser getInfoUser(@PathVariable Integer id){

        return userRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("User not found"));
    }

    @GetMapping("/invis")
    public List<ApplicationUser> getInvists(){
        return adminService.getInvists();
    }

    @PostMapping("/gencode/membre")
    public String generateCodeMem(){
        String code = codeGeneratorService.generateSaveCodeMembre();
        return code ;
    }

    @PostMapping("/gencode/investigateur")
    public String generateCodeInvi(){
        String code = codeGeneratorService.generateSaveCodeInvi();
        return code;
    }

    @DeleteMapping("/user/delete/{id}")
    public String deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
        return "user deleted successfully";
    }


//resoudre les probleme de git



}
