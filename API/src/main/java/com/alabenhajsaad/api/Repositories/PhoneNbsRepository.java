package com.alabenhajsaad.api.Repositories;

import com.alabenhajsaad.api.Entities.PhoneNbs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhoneNbsRepository extends JpaRepository<PhoneNbs, Integer> {
    PhoneNbs findPhoneNbsByNumber(String number) ;
}
