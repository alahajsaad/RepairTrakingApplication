package com.alabenhajsaad.api.Services;

import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Entities.PhoneNbs;
import com.alabenhajsaad.api.Repositories.PhoneNbsRepository;
import com.alabenhajsaad.api.Services.IServices.IServicePhoneNbs;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicePhoneNbs implements IServicePhoneNbs {
    private final PhoneNbsRepository repository ;

    @Override
    public Client getClientByPhoneN(String number) {
        PhoneNbs phoneNbs = repository.findPhoneNbsByNumber(number);
        if (phoneNbs != null && phoneNbs.getClient() != null) {
            return phoneNbs.getClient();
        } else {
            return null ;
        }
    }



}
