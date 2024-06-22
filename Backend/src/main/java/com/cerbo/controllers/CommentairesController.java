package com.cerbo.controllers;


import com.cerbo.Dto.CommentDTO;
import com.cerbo.Dto.CommentaireUpdateDTO;
import com.cerbo.Dto.ProjetDTO;
import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Commentaire;
import com.cerbo.repository.CommentRepository;
import com.cerbo.services.CommentaireService;
import com.cerbo.services.EmailService;
import com.cerbo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comment")

public class CommentairesController {

    @Autowired
    private UserService userService;
    @Autowired
    private CommentaireService commentaireService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/add")
    public Commentaire addComment(@RequestBody CommentDTO commentDTO){

        System.out.println(commentDTO.getCommentaire());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        Integer id;
        Jwt jwt = (Jwt) authentication.getPrincipal();
        // Access the claims from the JWT token
        String email = jwt.getSubject();
        UserDetails userDetails = userService.loadUserByUsername(email);
        ApplicationUser applicationUser = (ApplicationUser) userDetails;
        id=applicationUser.getUserId();

        return commentaireService.addCommentaire(commentDTO.getProjetId(),id,commentDTO.getCommentaire(),commentDTO.getFileComment());
    }


    @PostMapping("/validate")
    public void validateComment(){

    }

    @GetMapping("/all/{id}/{commentedFile}")
    public ResponseEntity<List<Commentaire>> getAllComment(@PathVariable Long id,@PathVariable String commentedFile){
        return ResponseEntity.ok(commentaireService.getAllCommentByProjectAndFile(id,commentedFile));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCommentStatus(@RequestBody List<CommentaireUpdateDTO> comments) {
        comments.stream()
                .forEach(comment -> commentaireService.updateCommentStatus(
                        comment.getId(),comment.getStatut())
                );


        return ResponseEntity.ok("succesfuly updated");

    }


    @GetMapping("/allvalide/{id}")
    public List<Commentaire> getAllCommentValide(@PathVariable Long id){

        return commentaireService.getAllCommentValid(id,true);
    }
}
