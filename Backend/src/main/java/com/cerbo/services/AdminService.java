package com.cerbo.services;


import com.cerbo.models.ApplicationUser;
import com.cerbo.models.Role;
import com.cerbo.repository.RoleRepository;
import com.cerbo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
public class AdminService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    // la liste des membres ------------------
    public List<ApplicationUser> getMembre(){

        List<ApplicationUser> users = userRepository.findAll();
        List<ApplicationUser> usersMembre=new ArrayList<>();
        Role userRole = roleRepository.findByAuthority("USER").get();

        for(ApplicationUser user : users){
            Set<Role> role = (Set<Role>) user.getAuthorities();

            for (Role roleChechk : role) {
                if (userRole.equals(roleChechk)) {
                    usersMembre.add(user);
                }
                else{ break;}
            }
        }
        return usersMembre;
    }

    // la liste des invistigateurs

    public List<ApplicationUser> getInvists(){

        List<ApplicationUser> users = userRepository.findAll();
        List<ApplicationUser> usersMembre=new ArrayList<>();
        Role userRole = roleRepository.findByAuthority("INVISTIGATOR").get();

        for(ApplicationUser user : users){
            Set<Role> role = (Set<Role>) user.getAuthorities();

            for (Role roleChechk : role) {
                if (userRole.equals(roleChechk)) {
                    usersMembre.add(user);
                }
                else{ break;}
            }
        }
        return usersMembre;
    }
}
