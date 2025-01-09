package com.alabenhajsaad.api.Services.IServices;

import com.alabenhajsaad.api.DTO.ReparationDto;
import com.alabenhajsaad.api.Entities.Reparation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IServiceReparation {
    String addReparation(ReparationDto dto) ;
    Reparation getReparationByCallNumber(String callNumber) ;
    Page<Reparation> getFiltredReparations(String machineRef, String clientPhoneNumber, Pageable pageable);
    Reparation getReparationById(int id) ;
    Reparation logCompletedTasks(int reparationId , String Tasks) ;

}
