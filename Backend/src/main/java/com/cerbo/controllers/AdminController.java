package com.cerbo.controllers;

import com.cerbo.Dto.CodeRegistDTO;
import com.cerbo.Dto.RefDTO;
import com.cerbo.Dto.ReunionReqDTO;
import com.cerbo.models.ApplicationUser;

import com.cerbo.repository.UserRepository;
import com.cerbo.services.*;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    @Autowired
    private ProjetService projetService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ReunionService reunionService;
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
    public String generateCodeMem(@RequestBody CodeRegistDTO codeRegistDTO){
        String code = codeGeneratorService.generateSaveCodeMembre(codeRegistDTO.getEmailUser());
        emailService.sendEmail(codeRegistDTO.getEmailUser(),"code d'inscription",code);

        return code ;
    }

    @PostMapping("/gencode/investigateur")
    public String generateCodeInvi(@RequestBody CodeRegistDTO codeRegistDTO){

        String code = codeGeneratorService.generateSaveCodeInvi(codeRegistDTO.getEmailUser());
        emailService.sendEmail(codeRegistDTO.getEmailUser(),"code d'inscription",code);

        return code;
    }

    @DeleteMapping("/user/delete/{id}")
    public String deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
        return "user deleted successfully";
    }

    // ajouter ref et statut
    @PutMapping("/projet/ref/{id}")
    public ResponseEntity<String> ajouteRefPourProjet(@RequestBody RefDTO refDTO, @PathVariable Long id){
        projetService.ajouterReferenceEtFinPremiereExamination(refDTO.getRef(),refDTO.getDate(),id);
        return ResponseEntity.ok("reference ajouter avec success");
    }

    // creer une Reunion si n'existe pas

    @PutMapping("/Reunion/addprojet/{id}")
    public ResponseEntity<String> CreerReunion(@RequestBody ReunionReqDTO reunionReqDTO, @PathVariable Long id){
        String message = reunionService.ajouterProjetAuReunion(reunionReqDTO.getDate(),reunionReqDTO.getMembersPresent(),id);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/valider/{id}")
    public ResponseEntity<String> validerProjet(@PathVariable Long id , @RequestParam("file") MultipartFile file){
        try {
        byte[] finalDecision = file.getBytes();
        return ResponseEntity.ok(projetService.validerProjet(id,finalDecision));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }




}
