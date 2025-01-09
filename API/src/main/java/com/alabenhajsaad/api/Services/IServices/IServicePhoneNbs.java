package com.alabenhajsaad.api.Services.IServices;

import com.alabenhajsaad.api.Entities.Client;

import java.util.Optional;

public interface IServicePhoneNbs {
    Client getClientByPhoneN(String number) ;
}
