package com.alabenhajsaad.api.Repositories;


import com.alabenhajsaad.api.Entities.Reparation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ReparationRepository extends JpaRepository<Reparation,Integer> {
    @Query("SELECT r.callNumber FROM Reparation r ORDER BY r.id DESC LIMIT 1")
    String findLastCallNumber();
    Reparation findReparationByCallNumber(String callNumber) ;
    Page<Reparation> findAll(Specification<Reparation> spec, Pageable pageable);


}
