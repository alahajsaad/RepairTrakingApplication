package com.alabenhajsaad.api.Services;

import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Repositories.ClientRepository;
import com.alabenhajsaad.api.Repositories.PhoneNbsRepository;
import com.alabenhajsaad.api.Services.IServices.IServiceClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ServiceClient implements IServiceClient {
    private final ClientRepository repository ;
    private final PhoneNbsRepository phoneNbsRepository;
    @Override
    @Transactional
    public Client addClient(Client client) {
        if (client.getPhoneNbsList() != null) {
            client.getPhoneNbsList().forEach(phoneNbs -> {
                        if(!phoneNbsRepository.existsPhoneNbsByNumber(phoneNbs.getNumber())){
                            phoneNbs.setClient(client) ;
                        }
                        else {
                            throw new RuntimeException("A client already exists with phone number: " + phoneNbs.getNumber());
                        }
            });
        }
        return repository.save(client);
    }



    @Override
    public Client UpdateClient(Client client) {
        if (client.getPhoneNbsList() != null) {
            client.getPhoneNbsList().forEach(phoneNbs -> phoneNbs.setClient(client));
        }
        return repository.save(client);
    }

    @Override
    public List<Client> GetAllClients() {
        return repository.findAll();
    }

    @Override
    public void delete(int id) {
        repository.deleteById(id);
    }

    @Override
    public Client getClientById(int id) {
        return repository.findById(id).get();
    }


}
