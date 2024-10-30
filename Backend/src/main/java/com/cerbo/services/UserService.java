package com.cerbo.services;

import com.cerbo.models.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cerbo.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }

    public void updatePassword(String email,String oldPassword, String newPassword) {

        // Find the user by ID
        ApplicationUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!verifyOldPassword(user, oldPassword)) {
            throw new IllegalArgumentException("Old password is incorrect");
        }
        // Update the user's password
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);

        // Save the updated user
        userRepository.save(user);
    }

    public boolean verifyOldPassword(ApplicationUser user,String oldPassword){

        return BCrypt.checkpw(oldPassword, user.getPassword());
    }

    public boolean userExistByEmail(String email){
        return userRepository.existsByEmail(email);
    }
}
