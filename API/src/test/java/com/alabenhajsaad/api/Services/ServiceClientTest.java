package com.alabenhajsaad.api.Services;

import com.alabenhajsaad.api.Entities.Client;
import com.alabenhajsaad.api.Entities.PhoneNbs;
import com.alabenhajsaad.api.Repositories.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


class ServiceClientTest {

//    // Création des mocks pour les dépendances
//    @Mock
//    private ClientRepository clientRepository ;
//    @Mock
//    private ServicePhoneNbs servicePhoneNbs ;
//
//    // Injection des mocks dans la classe à tester
//    @InjectMocks
//    private ServiceClient serviceClient ;
//
//    @BeforeEach
//    void setUp() {
//        // Initialisation des mocks
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testCreateUser_Success() {
//        // Données d'entrée
//        Client client = Client.builder()
//                .name("ala haj saad")
//                .email("ala@gmail.com")
//                .phoneNbsList(Arrays.asList(
//                        PhoneNbs.builder().number("96741093").build(),
//                        PhoneNbs.builder().number("96741094").build()
//                ))
//                .build();
//
//        // Configurer le mock
//        // ici on va definit ce qu'un mock doit renvoyer lorsque certaines methodes sont appelees
//        when(servicePhoneNbs.getClientByPhoneN(any(String.class))).thenReturn(null);
//        when(clientRepository.save(any(Client.class))).thenAnswer(invocation -> invocation.getArgument(0));
//
//        // Appeler la méthode
//        Client returnedClient = serviceClient.addClient(client) ;
//
//        // Vérifications
//        assertNotNull(returnedClient);
//        assertEquals(client.getName(), returnedClient.getName());
//        assertEquals(client.getEmail(), returnedClient.getEmail());
//        assertEquals(client.getPhoneNbsList().size(), returnedClient.getPhoneNbsList().size());
//
//        // Vérifier que les méthodes appropriées ont été appelées
//        verify(servicePhoneNbs,times(2)).getClientByPhoneN(any(String.class)) ;
//        verify(clientRepository, times(1)).save(any(Client.class));
//    }

}