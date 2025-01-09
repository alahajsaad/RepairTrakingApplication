import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import reparationService from "../../services/reparationService";
import { ReparationDto } from "../../types/ReparationDto";
import Button from "../../components/UI/Button";
import ClientInformation from "./ClientInformation";

const ReparationFormSchema = z.object({
  machineId: z.number(),
  description: z.string(),
});

type reparationForm = z.infer<typeof ReparationFormSchema>;

const AddReparation = () => {
  const [callNumber , setCallNumber] = useState<string>() ;
  const { register, setValue , handleSubmit,reset, formState: { errors} } = useForm<reparationForm>({
    resolver: zodResolver(ReparationFormSchema),
  });

  useEffect(() => {
    fetchCallNumber()
  } , []);
  const setMachineIdValue = (id: number) => {
    setValue('machineId', id);  // Set machine_id to the selected machine's ID
  };

  const onSubmitReparation = (data: reparationForm) => {
       console.log(data)
       addReparation(data)
       reset() 
  }
  const fetchCallNumber = async () => {
    try {
      const data = await reparationService.initCallNumber() ;
      setCallNumber(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addReparation = async (data: reparationForm) => {
    const reparation : ReparationDto ={
      machineId : data.machineId ,
      description : data.description,
      callNumber : callNumber! 

    }
    try {
      const data = await reparationService.addReparation(reparation)
      setCallNumber(data)
    } catch (error) {
      console.error('Error adding reparation:', error);
    }
  };
  

  return (
    <>
    <div className="p-4 m-4 rounded shadow-custom w-[50vw] mt-[5vh]">
      <p className="text-center">Numéro d'appel : {callNumber}</p>
      
      <ClientInformation setMachineId={setMachineIdValue} />
      

      <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmitReparation)}>
        <input value="machineId" hidden {...register("machineId")}/>
        <label>Description de la reparation :</label>
        <textarea className="border border-gray-500 rounded p-2 h-28" placeholder="Décrivez le problème ..." {...register("description")}/>
        <div className='flex justify-end mt-[20px]'>
          <Button type='submit' title='Ajouter' />
        </div>
      </form>
      
      </div>
    
      
    
   
    </>
  );
};

export default AddReparation;
