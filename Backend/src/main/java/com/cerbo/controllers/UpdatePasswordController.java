package com.cerbo.controllers;


import com.cerbo.Dto.UpdatePasswordRequest;
import com.cerbo.models.ApplicationUser;
import com.cerbo.services.BlackListJwtService;
import com.cerbo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/allUser")

public class UpdatePasswordController {

    @Autowired
    private BlackListJwtService blackListJwtService;
    @Autowired
    private UserService userService;

    @PutMapping("/changePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        Jwt jwt = (Jwt) authentication.getPrincipal();
        // Access the claims from the JWT token
        String email = jwt.getSubject();

        userService.updatePassword(email,updatePasswordRequest.getOldPassword(),updatePasswordRequest.getNewPassword());

        String token_string = jwt.getTokenValue();

        String jwtToken = token_string;

        // Add the JWT token to the blacklist
        blackListJwtService.addToBlacklist(jwtToken);

        return ResponseEntity.ok("Password updated successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String token_string = jwt.getTokenValue();

        String jwtToken = token_string;

        // Add the JWT token to the blacklist
        blackListJwtService.addToBlacklist(jwtToken);

        return ResponseEntity.ok("logout successfully");
    }

}
