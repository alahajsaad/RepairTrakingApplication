package com.alabenhajsaad.api.Repositories;


import com.alabenhajsaad.api.Entities.Machine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MachineRepository extends JpaRepository<Machine,Integer> {
    List<Machine> findMachinesByClientId(int id) ;
}
