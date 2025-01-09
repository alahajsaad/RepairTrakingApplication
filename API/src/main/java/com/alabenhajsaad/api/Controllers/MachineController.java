package com.alabenhajsaad.api.Controllers;

import com.alabenhajsaad.api.DTO.MachineDto;
import com.alabenhajsaad.api.Entities.Machine;
import com.alabenhajsaad.api.Services.IServices.IServiceMachine;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/machine/")
public class MachineController {
    private final IServiceMachine serviceMachine ;
    @PostMapping("/add")
    public Machine addMachine(@Valid @RequestBody MachineDto dto){
        return serviceMachine.AddMachine(dto);
    }
    @PutMapping("/update")
    public Machine updateMachine(@RequestBody Machine machine){
        return serviceMachine.updateMachine(machine) ;
    }
    @GetMapping("/get/{id}")
    public Machine getMachineById(@PathVariable int id){
        return serviceMachine.getMachineById(id) ;
    }
    @GetMapping("/all")
    public List<Machine> getMachinesByClientNumber(String number){
        return serviceMachine.getMachinesByClientNumber(number) ;
    }
}
