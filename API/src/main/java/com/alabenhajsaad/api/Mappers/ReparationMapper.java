package com.alabenhajsaad.api.Mappers;

import com.alabenhajsaad.api.DTO.ReparationDto;
import com.alabenhajsaad.api.Entities.Machine;
import com.alabenhajsaad.api.Entities.Reparation;
import com.alabenhajsaad.api.Services.IServices.IServiceMachine;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service

public class ReparationMapper {

    public Reparation toReparation(ReparationDto dto, Machine machine) {
        return Reparation.builder()
                .callNumber(dto.callNumber())
                .description(dto.description())
                .entryDate(LocalDate.now())
                .machine(machine)
                .build();
    }

}
