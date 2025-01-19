import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { z } from "zod";
import ClientForm from "../../components/Forms/ClientForm";
import MachineForm from "../../components/Forms/MachineForm";
import DropDown from "../../components/UI/DropDown";
import ModelToggleButton from "../../components/UI/ModelToggleButton";
import AddReparationHelper from "./AddReparationHelper";
import { useEffect, useState } from "react";
import { Client } from "../../types/Client";
import { Machine } from "../../types/Machine";


const clientFormSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d+$/, 'Le numéro de client doit contenir uniquement des chiffres')
    .length(8, 'Le numéro de client doit comporter exactement 8 chiffres'),
});

type getClientForm = z.infer<typeof clientFormSchema>;
type ClientInformationProps = {
  client? :Client ;
  setClient : (client : Client ) => void ;
  clientError? : string ;
  machines : Machine[] ;
  fetchClient : (phoneNumber : string) => void ;
  fetchMachines : (phoneNumber : string) => Promise<void>
  setSelectedMachineId : (id : number) => void ;
  machineError? :string ;
}

const ClientInformation = ({client ,setClient ,clientError , machines, fetchClient,fetchMachines,setSelectedMachineId,machineError} :ClientInformationProps ) => {
    const { register ,setValue, handleSubmit, formState: { errors } } = useForm<getClientForm>({
        resolver: zodResolver(clientFormSchema),
    });
    useEffect(() => {
       if(client === undefined){
        setValue("phoneNumber","")
       }
     } , [client]);
    const onSubmitClient = (data: getClientForm) => {
        fetchClient(data.phoneNumber)
    };
    
  return (
    <>
    <div className="mt-3 w-[60%]">
      <label htmlFor='phoneNumber'>Client :  
        <span data-testid="searchClientMessage" className={client ? "text-green-600" : "text-red-600"}>
                {client ? ` ${client.name}` : clientError ? ` ${clientError}` : ""}
        </span>
      </label>
      <div className='flex items-center gap-5 h-fit '>
        <form className='flex items-center border border-gray-500 rounded h-10 w-full' onSubmit={handleSubmit(onSubmitClient)}>
          <input  id='phoneNumber' placeholder='TEL :' {...register("phoneNumber")}  className="w-[80%] h-full p-2 border-none outline-none focus:ring-1 focus:ring-blue-500 rounded-l" />
          <button data-testid="searchButton" className="w-[20%] flex justify-center items-center h-full bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-r" type="submit">
            <FaArrowRightLong />
          </button>
        </form>
        <ModelToggleButton ModalTitle='Ajouter un nouveau client' testId="addClientFormButton" content={(toggleModal) => (
              <ClientForm setReparationClient={setClient} toggle={toggleModal}  />)} 
        />
      </div>
      {errors.phoneNumber && <p data-testid='PhoneNumberErrorMessage' className='error'>{errors.phoneNumber.message}</p>}
    </div>
      
    <div className="mt-3 w-[60%]">
      <label>Machine : <span className="text-red-600">{machineError ? ` ${machineError}` : ""}</span></label>
      <div className="flex items-center gap-5 h-fit ">
        <DropDown setChosed={setSelectedMachineId} Data={machines || []} />
        <ModelToggleButton ModalTitle='Filtrez vos réparations'  content={(toggleModal) => (
              <MachineForm client={client}  fetchMachines={fetchMachines} toggle={toggleModal} />)} 
        />
      </div>
    </div>
    </>
  )
}

export default ClientInformation