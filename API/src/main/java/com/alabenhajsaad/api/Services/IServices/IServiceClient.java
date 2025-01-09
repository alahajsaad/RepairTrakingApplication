package com.alabenhajsaad.api.Services.IServices;

import com.alabenhajsaad.api.Entities.Client;

import java.util.List;

public interface IServiceClient {
    Client addClient(Client client) ;
    Client UpdateClient(Client client) ;
    List<Client> GetAllClients () ;
    void delete(int id) ;
    Client getClientById(int id) ;
}
