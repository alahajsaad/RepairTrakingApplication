package com.alabenhajsaad.api.Controllers;

import com.alabenhajsaad.api.DTO.ReparationDto;
import com.alabenhajsaad.api.DTO.UpdateReparationDto;
import com.alabenhajsaad.api.Entities.Reparation;
import com.alabenhajsaad.api.Services.IServices.IServiceCallNumberGenerator;
import com.alabenhajsaad.api.Services.IServices.IServiceReparation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reparation/")
public class ReparationController {
    private final IServiceReparation serviceReparation ;
    private final IServiceCallNumberGenerator callNumberGenerator ;
    @GetMapping("/callNumber")
    public String getCallNumber(){
        return callNumberGenerator.generateNewCallNumber() ;
    }
    @PostMapping("/add")
    public String addReparation(@RequestBody ReparationDto dto){
        return serviceReparation.addReparation(dto) ;
    }
    @GetMapping("/byCallNumber")
    public Reparation getReparationByCallNumber(String callNumber){
        return serviceReparation.getReparationByCallNumber(callNumber) ;
    }
    @GetMapping("/filtred")
    public Page<Reparation> getFiltredReparations(
            @RequestParam(required = false) String MachineRef,
            @RequestParam(required = false) String ClientPhoneNumber ,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return serviceReparation.getFiltredReparations( MachineRef, ClientPhoneNumber, pageable);
    }

    @GetMapping("/{id}")
    public Reparation getReparationById(@PathVariable int id){
        return serviceReparation.getReparationById(id) ;
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<Reparation> logCompletedTasks(@PathVariable int id , @RequestParam String tasks) {
        if (tasks == null || tasks.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        Reparation updatedReparation = serviceReparation.logCompletedTasks(id, tasks);
        return ResponseEntity.ok(updatedReparation);
    }
}
