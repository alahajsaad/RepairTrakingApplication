import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/UI/Button";
import ClientInformation from "./ClientInformation";

import AddReparationHelper from "./AddReparationHelper";



//type reparationForm = z.infer<typeof ReparationFormSchema>;
type ReparationForm = {
  description: string;
};
const AddReparation = () => {
 
  const {callNumber,fetchCallNumber, addReparation , client ,setClient ,clientError , machines, fetchClient,fetchMachines,setSelectedMachineId ,selectedMachineId,resetStates ,machineError ,setMachineError} = AddReparationHelper();
 
  const { register,handleSubmit,reset ,formState: { errors } } = useForm<ReparationForm>();
 
  useEffect(() => {
    fetchCallNumber()
  } , [fetchCallNumber]);


  
  
  const validateMachineSelection = (): boolean => {
    if (!selectedMachineId) {
      setMachineError("Tu dois sélectionner une machine !");
      return false;
    }
    setMachineError(""); // Clear error if machine validation passes
    return true;
  };

  const onSubmit = (data: ReparationForm) => {
    // Validate machine selection before proceeding
    if (!validateMachineSelection()) return;

    // Add the reparation
    addReparation(data.description, selectedMachineId!);
    resetStates();
    setSelectedMachineId(undefined)
    reset();
  };
  
 

  return (
    <>
    <div className="p-4 m-4 rounded shadow-custom w-[50vw] mt-[5vh]">
      <p className="text-center">Numéro d'appel : {callNumber}</p>
      
      <ClientInformation machineError={machineError} client={client} setClient={setClient} clientError={clientError}  machines={machines} fetchClient={fetchClient} fetchMachines={fetchMachines} setSelectedMachineId={setSelectedMachineId} />
      

      <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
        <label>Description de la reparation :  {errors.description && <p className='error'>{errors.description.message}</p>}</label>
        <textarea className="border border-gray-500 rounded p-2 h-28" placeholder="Décrivez le problème ..."{...register("description", {
              required: "La description est obligatoire."
            })}/>
       
        <div className='flex justify-end mt-[20px]'>
          <Button type='submit' title='Ajouter' />
          
        </div>
      </form>
      
      </div>
    
      
    
   
    </>
  );
};

export default AddReparation;
