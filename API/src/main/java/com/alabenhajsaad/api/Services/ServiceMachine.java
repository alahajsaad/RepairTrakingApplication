package com.alabenhajsaad.api.Services;

import com.alabenhajsaad.api.DTO.MachineDto;
import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Entities.Machine;
import com.alabenhajsaad.api.Mappers.MachineMapper;
import com.alabenhajsaad.api.Repositories.MachineRepository;
import com.alabenhajsaad.api.Services.IServices.IServiceClient;
import com.alabenhajsaad.api.Services.IServices.IServiceMachine;
import com.alabenhajsaad.api.Services.IServices.IServicePhoneNbs;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceMachine implements IServiceMachine {
    private final MachineRepository repository ;
    private final MachineMapper mapper ;
    private final IServiceClient serviceClient ;
    private final IServicePhoneNbs servicePhoneNbs ;

    @Override
    public Machine AddMachine(MachineDto dto) {
        Client client  = serviceClient.getClientById(dto.ClientId()) ;
        return repository.save(mapper.toMachine(dto , client));
    }

    @Override
    public Machine updateMachine(Machine machine) {
        // Ensure that we're updating an existing machine, meaning its ID should not be null
        if (machine.getId() == null) {
            throw new IllegalArgumentException("Cannot update a machine without an ID");
        }

        // Optionally: You can verify that the machine exists in the database before updating
        if (!repository.existsById(machine.getId())) {
            throw new IllegalArgumentException("Machine with ID " + machine.getId() + " does not exist");
        }

        return repository.save(machine);
    }

    @Override
    public Machine getMachineById(int id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Machine> getMachinesByClientNumber(String number) {
        return repository.findMachinesByClientId(servicePhoneNbs.getClientByPhoneN(number).id);
    }
}
