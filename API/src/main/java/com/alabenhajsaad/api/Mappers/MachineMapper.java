package com.alabenhajsaad.api.Mappers;

import com.alabenhajsaad.api.DTO.MachineDto;
import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Entities.Machine;
import com.alabenhajsaad.api.Services.ServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MachineMapper {


    public Machine toMachine(MachineDto dto , Client client){
        return Machine.builder()
                .designation(dto.designation())
                .reference(dto.reference())
                .client(client)
                .build() ;
    }
}
