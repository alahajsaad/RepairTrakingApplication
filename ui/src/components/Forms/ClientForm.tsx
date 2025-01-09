import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../UI/Input';
import Button from '../UI/Button';
import { Client } from '../../types/Client';
import clientService from '../../services/clientService';



const formSchema = z.object({
  name: z.string().min(1, 'Le nom est obligatoire'),
  email: z.string().email('Adresse email invalide'),
  phoneNbsList: z.array(z.string()
  .regex(/^\d+$/, 'Le numéro de client doit contenir uniquement des chiffres')
  .length(8, 'Le numéro de client doit comporter exactement 8 chiffres')
  .min(1, 'Au moins un numéro de téléphone est requis')  // Enforce at least one phone number
)});


type FormValues = z.infer<typeof formSchema>;
type ClientFormProps = {
  client: Client;
  setClient : (data : Client) => void ;
  toggle: (isEditing: boolean) => void;
};
const ClientForm = ({client , setClient ,toggle} : Partial<ClientFormProps> ) => {
  const {register,handleSubmit,reset, formState: { errors },} = useForm<FormValues>({
    defaultValues: client
    ? {
        email : client.email,
        name: client.name,
        phoneNbsList : client.phoneNbsList.map(phone => phone.number),
       
      }
    : undefined,
    resolver: zodResolver(formSchema), // Using zodResolver for validation
  });

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
      phoneNbsList: client.phoneNbsList.map(phone => ({
        number: phone,
      })),
    };
    
    try {
      const response = await clientService.addClient(clientData);
      setClient?.(response);
    } catch (error) {
      console.log(error)
    }
  };

/**
 * Updates an existing client with new details, including name, email, and phone numbers.
 *
 * @param {FormValues} updatedclient - The updated client data from the form, including the name, email, and an array of phone numbers.
 * @param {Client} client - The original client object, containing the existing client information such as ID and phone numbers.
 * 
 * @description
 * This function prepares a `Client` object by merging the updated data from the form (`updatedclient`) 
 * with the existing client information (`client`). It maps the updated phone numbers to match the 
 * structure required for the `phoneNbsList` property, retaining the original IDs of phone numbers if they exist.
 *
 * - For each phone number in `updatedclient.phoneNumbers`, the function:
 *   1. Assigns the existing ID from `client.phoneNbsList[index]?.id` if available.
 *   2. Uses the updated phone number directly for the `number` property.
 *
 * Once the `Client` object (`clientData`) is constructed, it sends it to the `clientService.updateClient` function 
 * to update the client on the backend.
 *
 * @returns {Promise<any>} - The response from the client update service, or `undefined` if an error occurs.
 * 
 * @throws Logs any errors that occur during the update process to the console.
 */
  const updateClient = async (updatedclient: FormValues, client: Client) => {
    const clientData: Client = {
      id: client.id,
      name: updatedclient.name,
      email: updatedclient.email!,
      phoneNbsList: updatedclient.phoneNbsList.map((phoneNumber, index) => ({
        id: client.phoneNbsList[index]?.id , 
        number: phoneNumber, 
      })),
    }
    try {
      const response = await clientService.updateClient(clientData);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  
   
  
   
  return (
    <form className='card' onSubmit={handleSubmit(handleFormSubmit)} >
      <div className='flex flex-col gap-2 w-fit'>
          <div>
            <Input placeholder='Name' {...register('name')} />
            {errors.name && <p className='error'>{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder='Email' {...register('email')} />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder='TEL 1' {...register('phoneNbsList.0')} />
            {errors.phoneNbsList?.[0] && <p className='error'>{errors.phoneNbsList[0].message}</p>}
          </div>
          <div>
            <Input placeholder='TEL 2' {...register('phoneNbsList.1')} />
            {errors.phoneNbsList?.[1] && <p className='error'>{errors.phoneNbsList[1].message}</p>}
          </div>
      </div>
      <div className='flex justify-end mt-[20px]'>
          <Button type='submit' title={client ? 'Modifier' : 'Ajouter'} />
      </div>
   </form>
    
      
    
  );
  
};

export default ClientForm;
