package com.alabenhajsaad.api.Services;

import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Entities.PhoneNbs;
import com.alabenhajsaad.api.Repositories.ClientRepository;
import com.alabenhajsaad.api.Services.IServices.IServiceClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServiceClient implements IServiceClient {
    private final ClientRepository repository ;
    private final ServicePhoneNbs servicePhoneNbs ;
    @Override
    @Transactional
    public Client addClient(Client client) {
//        if (client.getPhoneNbsList() != null) {
//            for (PhoneNbs phoneNbs : client.getPhoneNbsList()) {
//                // Check if the phone number is already associated with a client
//                Client existingClient = servicePhoneNbs.getClientByPhoneN(phoneNbs.getNumber());
//                if (existingClient != null) {
//                    throw new IllegalArgumentException("A client already exists with phone number: " + phoneNbs.getNumber());
//                }
//                // Set the relationship
//                phoneNbs.setClient(client);
//            }
//        }
        // Save the client
        if (client.getPhoneNbsList() != null) {
            client.getPhoneNbsList().forEach(phoneNbs -> phoneNbs.setClient(client));
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
        return List.of();
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
