package com.cerbo.controllers;

import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Commentaire;
import com.cerbo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")

public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String helloUserController(){
        return "User access level";
    }


    @GetMapping("/info")
    public ApplicationUser infouser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Integer id;
        Jwt jwt = (Jwt) authentication.getPrincipal();
        // Access the claims from the JWT token
        String email = jwt.getSubject();
        UserDetails userDetails = userService.loadUserByUsername(email);
        ApplicationUser applicationUser = (ApplicationUser) userDetails;
        return applicationUser;
    }

    @PutMapping("/profile/edit")
    public ResponseEntity<String> editProfile(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Integer id;
        Jwt jwt = (Jwt) authentication.getPrincipal();
        // Access the claims from the JWT token
        String email = jwt.getSubject();
        UserDetails userDetails = userService.loadUserByUsername(email);
        ApplicationUser applicationUser = (ApplicationUser) userDetails;
        return ResponseEntity.ok("dddddddd");

    }


}
