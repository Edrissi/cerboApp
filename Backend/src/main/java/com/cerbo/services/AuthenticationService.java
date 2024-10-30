package com.cerbo.services;

import java.util.HashSet;
import java.util.Set;

import com.cerbo.Dto.ResetPasswordRequest;
import com.cerbo.exception.EmailAlreadyExistsException;
import com.cerbo.exception.InvalidRegistrationCodeException;
import com.cerbo.models.CodeRegistrationInvistigateur;
import com.cerbo.models.ResetPasswordCode;
import com.cerbo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cerbo.models.ApplicationUser;
import com.cerbo.Dto.LoginResponseDTO;
import com.cerbo.models.Role;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CodeRegMembreInterface codeRegMembreInterface;

    @Autowired
    private CodeRegistrationInviInterface codeRegistrationInviInterface;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CodeGeneratorService generatorService;

    @Autowired
    private ResetPasswordCodeRepository resetPasswordCodeRepository;


    // authentication member -----------

    public ResponseEntity<String> registerUser(String code , String email, String password , String specialite , String affiliation , String titre , String nom, String prenom) {
        try {
            if (codeRegMembreInterface.findByCode(code).isPresent()) {

                if (userRepository.existsByEmail(email)) {
                    throw new EmailAlreadyExistsException("Email already exists");
                }

                String encodedPassword = passwordEncoder.encode(password);
                Role userRole = roleRepository.findByAuthority("USER").get();

                Set<Role> authorities = new HashSet<>();

                authorities.add(userRole);

                ApplicationUser applicationUser = new ApplicationUser(0, email, encodedPassword, authorities);
                applicationUser.setSpecialite(specialite);
                applicationUser.setAffilliation(affiliation);
                applicationUser.setTitre(titre);
                applicationUser.setPrenom(prenom);
                applicationUser.setNom(nom);
                userRepository.save(applicationUser);

                codeRegMembreInterface.deleteByCode(code);

                return ResponseEntity.ok("registration successful");


            } else {
                throw new InvalidRegistrationCodeException("Invalid registration code");
            }
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (InvalidRegistrationCodeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Handle any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    ////authentication invistigator ---------------------
    public ResponseEntity<String> registerUserInvi(String code, String email, String password , String specialite , String adresse , String titre , String nom, String prenom){

        try {
        if (codeRegistrationInviInterface.findByCode(code).isPresent()) {
            if (userRepository.existsByEmail(email)) {
                throw new EmailAlreadyExistsException("Email already exists");
            }
            String encodedPassword = passwordEncoder.encode(password);
            Role userRole = roleRepository.findByAuthority("INVISTIGATOR").get();

            Set<Role> authorities = new HashSet<>();

            authorities.add(userRole);

            ApplicationUser appUser = new ApplicationUser(0, email, encodedPassword, authorities);
            appUser.setNom(nom);
            appUser.setPrenom(prenom);
            appUser.setSpecialite(specialite);
            appUser.setAdresse(adresse);
            appUser.setTitre(titre);
            userRepository.save(appUser);

            codeRegistrationInviInterface.deleteByCode(code);

            return ResponseEntity.ok("register user successfuly");
        }else{
            throw new InvalidRegistrationCodeException("Invalid registration code");
        }
        } catch (EmailAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (InvalidRegistrationCodeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // Handle any other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    // login for all user -------------------
    public LoginResponseDTO loginUser(String email, String password){

        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(userRepository.findByEmail(email).get(), token);

        } catch(AuthenticationException e){
            return new LoginResponseDTO(null, "");
        }
    }

    // send code for reseting password
    public void  sendCodeResetPassword(String email){

        String code = generatorService.generateCode();
        String encodedCode = passwordEncoder.encode(code);
        resetPasswordCodeRepository.save(new ResetPasswordCode(0L,email, encodedCode));

        emailService.sendEmail(email,"Code pour réinitialiser le mot de passe",code);
    }

    public ResponseEntity<?> resetPassword(ResetPasswordRequest body) {

        // Récupérer le code de réinitialisation
        ResetPasswordCode resetPasswordCode = resetPasswordCodeRepository.findByEmail(body.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Code expired"));

        // Vérifier si le code fourni correspond à celui dans la base de données (sans re-encoder)
        if (!resetPasswordCode.getCode().equals(passwordEncoder.encode(body.getCode()))) {
            System.out.println(resetPasswordCode.getCode());
            System.out.println(passwordEncoder.encode(body.getCode()));
            System.out.println(body.getCode());
            return new ResponseEntity<>("Code invalid", HttpStatus.BAD_REQUEST);  // Ajouter HttpStatus.BAD_REQUEST ici
        }

        // Récupérer l'utilisateur avec l'email correspondant
        ApplicationUser user = userRepository.findByEmail(body.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Mettre à jour le mot de passe de l'utilisateur
        String encodedPassword = passwordEncoder.encode(body.getNewPassword());
        user.setPassword(encodedPassword);

        // Enregistrer l'utilisateur mis à jour
        userRepository.save(user);

        // Supprimer le code de réinitialisation une fois utilisé
        resetPasswordCodeRepository.deleteByEmail(body.getEmail());

        return ResponseEntity.ok("Password updated successfully");
    }


}
