package com.cerbo.configuration;

import com.cerbo.services.BlackListJwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtTokenValidationFilter extends OncePerRequestFilter {
    @Autowired
    private  BlackListJwtService tokenBlacklistService;

    public JwtTokenValidationFilter(BlackListJwtService tokenBlacklistService){
        this.tokenBlacklistService=tokenBlacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwtToken = extractToken(request);
        if (jwtToken != null) {
            // Check if the token is blacklisted
            if (tokenBlacklistService.isTokenBlacklisted(jwtToken)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is blacklisted");
                return;
            }
            // Token is valid, continue with the filter chain
        }
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        // Extract JWT token from request
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return jwt.getTokenValue();
        } else {
            return null;
        }


    }
}
