package com.cerbo.services;

import java.time.Duration;
import java.time.Instant;
import java.util.stream.Collectors;

import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Role;
import com.cerbo.repository.RoleRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    
    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private UserRepository applicationUserRepository;

    @Autowired
    private RoleRepository roleRepository;  

    public String generateJwt(Authentication auth){

        Instant now = Instant.now();

        // expiration time -------------------------------
        Instant expirationTime = now.plus(Duration.ofSeconds(120 * 60));


        String scope = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now).expiresAt(expirationTime)
            .subject(auth.getName())
            .claim("roles", scope)
            .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public ApplicationUser getApplicationUserFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String username = jwt.getClaimAsString("sub");
            ApplicationUser applicationUser = applicationUserRepository
                    .findByEmail(username).orElseThrow(
                            () -> new RuntimeException("user : " + username + " not found")
                    );
            return applicationUser;
        }
        return null;
    }

    public Role getRoleFromTorken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            String authority = jwt.getClaimAsString("roles");
            Role role = roleRepository.findByAuthority(authority)
                    .orElseThrow(() -> new RuntimeException("authority: "+authority+" Not found"));
            return role;
        }
        return null;
    }

}
