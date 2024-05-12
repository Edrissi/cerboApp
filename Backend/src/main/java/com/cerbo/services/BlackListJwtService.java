package com.cerbo.services;


import com.cerbo.models.BlackListJwt;
import com.cerbo.repository.BlackListJwtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlackListJwtService {
    @Autowired
    private BlackListJwtRepository blackListJwtRepository;

    public void addToBlacklist(String token) {
        BlackListJwt blackListJwt = new BlackListJwt();
        blackListJwt.setToken(token);
        this.saveEntity(blackListJwt);
    }

    public boolean isTokenBlacklisted(String token) {
        return blackListJwtRepository.existsByToken(token);
    }

    public void removeFromBlacklist(String token) {
        blackListJwtRepository.deleteByToken(token);
    }

    public void saveEntity(BlackListJwt blackListJwt) {
        if (blackListJwtRepository.existsByToken(blackListJwt.getToken())) {

        } else {
            blackListJwtRepository.save(blackListJwt);
        }
    }
}
