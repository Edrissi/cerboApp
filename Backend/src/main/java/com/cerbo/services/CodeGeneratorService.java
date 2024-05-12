package com.cerbo.services;


import com.cerbo.models.CodeRegistrationInvistigateur;
import com.cerbo.models.CodeRegistrationMembre;
import com.cerbo.repository.CodeRegMembreInterface;
import com.cerbo.repository.CodeRegistrationInviInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CodeGeneratorService {

    @Autowired
    private CodeRegistrationInviInterface codeRegistrationInviInterface;

    @Autowired
    private CodeRegMembreInterface codeRegMembreInterface;

    public String generateSaveCodeMembre( ){

        // generate a code for membre signup
        String code = generateCode();

        // save the code
        CodeRegistrationMembre codeRegistrationMembre = new CodeRegistrationMembre();
        codeRegistrationMembre.setCode(code);
        codeRegMembreInterface.save(codeRegistrationMembre);

        return code;

    }
    public String generateSaveCodeInvi( ){

        // generate a code for membre signup
        String code = generateCode();

        // save the code
        CodeRegistrationInvistigateur codeRegistrationInvistigateur = new CodeRegistrationInvistigateur();
        codeRegistrationInvistigateur.setCode(code);
        codeRegistrationInviInterface.save(codeRegistrationInvistigateur);

        return code ;

    }

    public String generateCode(){

        // Generate a random number
        Random random = new Random();
        int randomNumber = random.nextInt(5176) + 28345;

        // Convert the number to a string
        String fiveDigitCode = String.valueOf(randomNumber);
        return fiveDigitCode;

    }

}
