import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../UI/Input';
import Button from '../UI/Button';
import { Client } from '../../types/Client';
import clientService from '../../services/clientService';
import { toast } from 'react-toastify';
import { useReparation } from '../../context/ReparationContext';
import { useEffect } from 'react';




const formSchema = z.object({
  name: z.string().min(1, 'Le nom est obligatoire'),
  email: z.string()
    .email('Adresse email invalide')
    .optional()
    .or(z.literal('')),
  phoneNbsList: z.tuple([
    z.string()
      .regex(/^\d+$/, 'Le numéro de client doit contenir uniquement des chiffres')
      .length(8, 'Le numéro de client doit comporter exactement 8 chiffres'),
    z.string()
      .regex(/^\d+$/, 'Le numéro de client doit contenir uniquement des chiffres')
      .length(8, 'Le numéro de client doit comporter exactement 8 chiffres')
      .optional()
      .or(z.literal(''))
  ])
});


type FormValues = z.infer<typeof formSchema>;
type ClientFormProps = {
  client: Client;
  setReparationClient : (data : Client) => void ;
  toggle: (isEditing: boolean) => void;
};
const ClientForm = ({client , setReparationClient ,toggle } : Partial<ClientFormProps> ) => {
  const { updateReparationClient } = useReparation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
  defaultValues: client
    ? {
        email: client.email,
        name: client.name,
        phoneNbsList: [
          client.phoneNbsList[0]?.number, // Ensure the first phone number is always a string
          client.phoneNbsList[1]?.number ?? undefined, // Ensure the second phone number is either a string or undefined
        ],
      }
    : undefined,
  resolver: zodResolver(formSchema), // Using zodResolver for validation
});

useEffect(() => {
  if (client) {
    reset({
      email: client.email || '',
      name: client.name || '',
      phoneNbsList: [
        client.phoneNbsList[0]?.number || '',
        client.phoneNbsList[1]?.number || '',
      ],
    });
  }
}, [client, reset]);
  const handleFormSubmit = (data: FormValues) => {
    console.log(data)
    if(client) {
      updateClient(data , client) ;
    } else {
      addUser(data); 
    }
    toggle?.(false)
    reset(); 
  };
 


  const addUser = async (client: FormValues) => {
    console.log(client)
    const clientData: Partial<Client> = {
    name: client.name,
    email: client.email,
    phoneNbsList: client.phoneNbsList
    .filter((num): num is string => num !== undefined && num.trim() !== '')
    .map(num => ({
      number: num, // Transform each number into an object with the `number` property
    })),};
    try {
      const response = await clientService.addClient(clientData);
      setReparationClient?.(response);
      toast.success('Le client ajouter avec suscess', {
        position: 'top-right', 
      });
    } catch (error) {
      console.log(error)
      toast.error('Le client avec ce numéro existe déjà.', {
        position: 'top-right', 
      });
    }
  };


  const updateClient = async (updatedclient: FormValues, client: Client) => {
    const clientData: Client = {
      id: client.id,
      name: updatedclient.name,
      email: updatedclient.email!,
      phoneNbsList: updatedclient.phoneNbsList.map((phoneNumber, index) => ({
        id: client.phoneNbsList[index]?.id , 
        number: phoneNumber || '', 
      })),
    }
    try {
      const response = await clientService.updateClient(clientData);
      updateReparationClient(response)
    } catch (error) {
      console.log(error);
    }
  };
  
  
   
  
   
  return (
    <form className='card' onSubmit={handleSubmit(handleFormSubmit)} >
      <div className='flex flex-col gap-2 w-fit'>
          <div>
            <Input placeholder='Nom **' {...register('name')} />
            {errors.name && <p className='error'>{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder='Email' {...register('email')} />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder='TEL 1 **' {...register('phoneNbsList.0')} />
            {errors.phoneNbsList?.[0] && <p className='error'>{errors.phoneNbsList[0].message}</p>}
          </div>
          <div>
            <Input placeholder='TEL 2' {...register('phoneNbsList.1')} />
            {errors.phoneNbsList?.[1] && <p className='error'>{errors.phoneNbsList[1].message}</p>}
          </div>
      </div>
      <div className='flex justify-end mt-[20px]'>
          <Button testId="AddClientButton" type='submit' title={client ? 'Modifier' : 'Ajouter'} />
      </div>
   </form>
    
      
    
  );
  
};

export default ClientForm;
