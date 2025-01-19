import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../UI/Input';
import Button from '../UI/Button';
import { Machine } from '../../types/Machine';
import { Client } from '../../types/Client';
import machineService from '../../services/machineService';
import { MachineDto } from '../../types/MachineDto';
import { toast } from 'react-toastify';
import { useReparation } from '../../context/ReparationContext';
import { useEffect } from 'react';



const formSchema = z.object({
  reference: z.string().min(1, "Référence is required"),
  designation: z.string().min(1, "Désignation is required"), 
});

type FormValues = z.infer<typeof formSchema>;

type MachineFormProps = {
  machine?: Machine; 
  client? : Client ;
  toggle: (isEditing: boolean) => void;
  setReparationMachineId? : (machineId : number) => void ;
  fetchMachines? : (phoneNumber: string) => Promise<void>;
};

const MachineForm = ({machine , client ,toggle , setReparationMachineId ,fetchMachines} : MachineFormProps) => {
  const { updateReparationMachine } = useReparation();
  const { register, handleSubmit , reset , formState: { errors },} = useForm<FormValues>({
    defaultValues : machine ? {
      designation :machine.designation,
      reference : machine.reference ,
    } : undefined ,
    resolver: zodResolver(formSchema), 
  });
  
  useEffect(() => {
    if (machine) {
      reset({
        designation: machine.designation,
        reference: machine.reference,
      });
    } else {
      reset();
    }
  }, [machine, reset]);
  const handleFormSubmit = (data: FormValues) => {
    if (!client) {
      toast.error('Veuillez rechercher un client ou ajouter un nouveau.', { position: 'top-right' });
      console.error("Client is required.");
      return;
    }
    if(machine) {
      updateMachine(data ,machine, client) ;
    } else {
      addMachine(data,client); 
    }
    toggle?.(false)
    reset(); 
  };
  


  const addMachine = async (machine : FormValues , client : Client) =>{
    const machineData: MachineDto = {
      reference: machine.reference,
      designation: machine.designation,
      ClientId: client.id, 
    };
    try {
      // Add the machine using the service
      const response = await machineService.addMachine(machineData);
      toast.success('Opération réussie!', { position: 'top-right' });
      // Fetch machines first, ensuring the function exists and a phone number is available
      if (fetchMachines && client.phoneNbsList?.[0]?.number) {
        await fetchMachines(client.phoneNbsList[0].number); // Ensures this completes first
      }
    
      // After fetching machines, set the reparation machine ID
      setReparationMachineId?.(response.id);
    
      return response;
    } catch (error) {
      console.error("Error adding machine:", error);
      throw error;
    }
  }
  const updateMachine = async (updatedMachine: FormValues,machine :Machine , client: Client) => {
    const machineData: Machine = {
      id: machine.id,
      reference : updatedMachine.reference ,
      designation :updatedMachine.designation,
      client :client
      
    }
    try {
      const response = await machineService.updateMachine(machineData);
      updateReparationMachine(response) ;
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  

 
  return (
    <form className='card' onSubmit={handleSubmit(handleFormSubmit)} >
      <div className='flex flex-col gap-2 w-fit'>
        <div>
          <Input placeholder='Référence' {...register('reference')} />
          {errors.reference && <p className='error'>{errors.reference.message}</p>}
        </div>
        <div>
          <Input placeholder='Désignation' {...register('designation')} />
          {errors.designation && <p className='error'>{errors.designation.message}</p>}
        </div>
      </div>
      <div className='flex justify-end mt-[20px]'>
          <Button type='submit' title={machine ? 'Modifier' : 'Ajouter'} />
      </div>
    </form>
    
        
  
      
     
  );
};

export default MachineForm;
