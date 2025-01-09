package com.alabenhajsaad.api.Repositories;


import com.alabenhajsaad.api.Entities.Reparation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReparationRepository extends JpaRepository<Reparation,Integer> {
    @Query("SELECT r.callNumber FROM Reparation r ORDER BY r.id DESC LIMIT 1")
    String findLastCallNumber();
    Reparation findReparationByCallNumber(String callNumber) ;
    List<Reparation> findReparationByMachineReference(String reference) ;
    @Query("SELECT r FROM Reparation r WHERE r.machine.client.id = ( SELECT c.id FROM Client c JOIN c.phoneNbsList p WHERE p.number = :phoneNumber)")
    List<Reparation> findReparationsByClientPhoneNumber(String phoneNumber);

    Page<Reparation> findAll(Specification<Reparation> spec, Pageable pageable);


}
