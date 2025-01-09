package com.alabenhajsaad.api.Services.IServices;

import com.alabenhajsaad.api.DTO.MachineDto;
import com.alabenhajsaad.api.Entities.Machine;

import java.util.List;

public interface IServiceMachine {
    Machine AddMachine(MachineDto machine) ;
    Machine updateMachine(Machine machine) ;
    Machine getMachineById(int id) ;
    List<Machine> getMachinesByClientNumber(String number) ;

}
