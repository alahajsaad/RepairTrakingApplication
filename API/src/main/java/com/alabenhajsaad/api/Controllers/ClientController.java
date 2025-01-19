package com.alabenhajsaad.api.Controllers;

import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Services.IServices.IServiceClient;
import com.alabenhajsaad.api.Services.IServices.IServicePhoneNbs;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {
    private final IServiceClient serviceClient ;
    private final IServicePhoneNbs servicePhoneNbs ;

    @PostMapping("/add")
    public Client addClient(@RequestBody Client client){
        return serviceClient.addClient(client) ;
    }
    @GetMapping("/all")
    public List<Client> getAllClients(){
        return serviceClient.GetAllClients() ;
    }
    @GetMapping("/get")
    public Client getClient(String phoneNumber){
        return servicePhoneNbs.getClientByPhoneN(phoneNumber) ;
    }
    @PutMapping("/update")
    public Client updateClient(@RequestBody Client client){
        return serviceClient.UpdateClient(client) ;
    }
    @DeleteMapping("/delete/{id}")
    public void deleteClient(@PathVariable int id){
        serviceClient.delete(id);
    }
}
