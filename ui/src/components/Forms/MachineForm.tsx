import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../UI/Input';
import Button from '../UI/Button';
import { Machine } from '../../types/Machine';
import { Client } from '../../types/Client';
import machineService from '../../services/machineService';
import { MachineDto } from '../../types/MachineDto';



const formSchema = z.object({
  reference: z.string().min(1, "Référence is required"),
  designation: z.string().min(1, "Désignation is required"), 
});

type FormValues = z.infer<typeof formSchema>;

type MachineFormProps = {
  machine?: Machine; 
  client? : Client ;
  toggle: (isEditing: boolean) => void;
};

const MachineForm = ({machine , client ,toggle} : MachineFormProps) => {
  const { register, handleSubmit , reset , formState: { errors },} = useForm<FormValues>({
    defaultValues : machine ? {
      designation :machine.designation,
      reference : machine.reference ,
    } : undefined ,
    resolver: zodResolver(formSchema), 
  });
  
  const handleFormSubmit = (data: FormValues) => {
    if (!client) {
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
      const response = await machineService.addMachine(machineData);
     
      return response;
    } catch (error) {
      console.log(error)
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
          <Button type='submit' title='Ajouter' />
      </div>
    </form>
    
        
  
      
     
  );
};

export default MachineForm;
