package com.alabenhajsaad.api.Repositories;


import com.alabenhajsaad.api.Entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Integer> {
}
