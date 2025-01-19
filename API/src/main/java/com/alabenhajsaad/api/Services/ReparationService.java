package com.alabenhajsaad.api.Services;


import com.alabenhajsaad.api.DTO.ReparationDto;
import com.alabenhajsaad.api.Entities.Machine;
import com.alabenhajsaad.api.Entities.Reparation;
import com.alabenhajsaad.api.Exceptions.MachineNotFoundException;
import com.alabenhajsaad.api.Mappers.ReparationMapper;
import com.alabenhajsaad.api.Repositories.ReparationRepository;
import com.alabenhajsaad.api.Services.IServices.IServiceCallNumberGenerator;
import com.alabenhajsaad.api.Services.IServices.IServiceReparation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReparationService implements IServiceReparation {
    private final ReparationRepository repository ;
    private final ReparationMapper mapper ;
    private final ServiceMachine serviceMachine ;
    private final IServiceCallNumberGenerator callNumberGenerator ;
    private final ReparationSpecification reparationSpecification ;

    @Override
    @Transactional
    public String addReparation(ReparationDto dto) {
        Machine machine = serviceMachine.getMachineById(dto.machineId());
        if (machine == null) {
            throw new MachineNotFoundException("Machine not found for ID: " + dto.machineId());
        }
        Reparation reparation = mapper.toReparation(dto, machine);
        repository.save(reparation);
        return callNumberGenerator.generateNewCallNumber() ;
    }


    @Override
    public Reparation getReparationByCallNumber(String callNumber) {
        return repository.findReparationByCallNumber(callNumber);
    }
    @Override
    public Page<Reparation> getFiltredReparations(
            String machineRef,
            String clientPhoneNumber,
            Pageable pageable)
    {
        Specification<Reparation> spec = Specification
                .where(reparationSpecification.hasClientPhoneNumber(clientPhoneNumber))
                .and(reparationSpecification.hasMachineReference(machineRef)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(spec, pageable);
    }
    @Override
    public Reparation getReparationById(int id) {
        return repository.findById(id).get();
    }

    @Override
    public Reparation logCompletedTasks(int reparationId, String tasks) {
        Optional<Reparation> optionalReparation = repository.findById(reparationId);
        if (optionalReparation.isEmpty()) {
            throw new EntityNotFoundException("Reparation with ID " + reparationId + " not found.");
        }

        Reparation reparation = optionalReparation.get();
        reparation.setDescriptionTravail(tasks);
        return repository.save(reparation);
    }


}
