import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "../../types/Client";
import { Machine } from "../../types/Machine";
import { FaArrowRightLong } from "react-icons/fa6";
import ModelToggleButton from "../../components/UI/ModelToggleButton";
import ClientForm from "../../components/Forms/ClientForm";
import DropDown from "../../components/UI/DropDown";
import MachineForm from "../../components/Forms/MachineForm";
import clientService from "../../services/clientService";
import machineService from "../../services/machineService";
const clientFormSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d+$/, 'Le numéro de client doit contenir uniquement des chiffres')
    .length(8, 'Le numéro de client doit comporter exactement 8 chiffres'),
});

type getClientForm = z.infer<typeof clientFormSchema>;

type ClientInformationProps = {
    setMachineId : (machineId : number) => void ;
}
const ClientInformation = ({setMachineId} : ClientInformationProps) => {

    const [client , setClient] = useState<Client | undefined>();
    const [machines, setMachines] = useState<Machine[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { register , handleSubmit, formState: { errors } } = useForm<getClientForm>({
        resolver: zodResolver(clientFormSchema),
    });

   
    const onSubmitClient = (data: getClientForm) => {
        fetchClient(data.phoneNumber)
    };
    const fetchClient = async (phoneNumber : string) => {
      setClient(undefined);
      setMachines([])
        try {
          const fetchedClient = await clientService.getClientByPhoneNumber(phoneNumber);
          setClient(fetchedClient);
          // fetch client machines if client fetched successfully
          if (fetchedClient) {
            fetchMachines(phoneNumber); 
          }
         // reset(); 
        } catch (err) {
          console.error(err);
          setError('Client non trouvé');
          console.log(error)
        } 
    };
    const fetchMachines = async (phoneNumber : string) => {
         try {
           const data = await machineService.getMachinesByClientPhoneNumber(phoneNumber) ;
           setMachines(data)
           console.log(data)
           } catch (error) {
           console.error("Error fetching data:", error);
         }
    };
    
  return (
    <>
    <div className="mt-3 w-[60%]">
      <label htmlFor='phoneNumber'>Client :  
        <span data-testid='searchClientMessage' className={`${client ? 'text-green-600' : 'text-red-600'}`}>
          
            {client? client.name : error}
        </span>
      </label>
        <div className='flex items-center gap-5 h-fit '>
          <form className='flex items-center border border-gray-500 rounded h-10 w-full' onSubmit={handleSubmit(onSubmitClient)}>
            <input  id='phoneNumber' placeholder='TEL :' {...register("phoneNumber")}  className="w-[80%] h-full p-2 border-none outline-none focus:ring-1 focus:ring-blue-500 rounded-l" />
           
            <button data-testid="searchButton" className="w-[20%] flex justify-center items-center h-full bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-r" type="submit">
              <FaArrowRightLong />
            </button>
          </form>
          
          <ModelToggleButton ModalTitle='Ajouter un nouveau client' content={(toggleModal) => (
               <ClientForm setClient={setClient} toggle={toggleModal} />
        )} />
        
        </div>
        {errors.phoneNumber && <p data-testid='PhoneNumberErrorMessage' className='error'>{errors.phoneNumber.message}</p>}
      </div>
      
      <div className="mt-3 w-[60%]">
        <label>Machine :</label>
        <div className="flex items-center gap-5 h-fit ">
          <DropDown setChosed={setMachineId} Data={machines || []} />
          <ModelToggleButton ModalTitle='Filtrez vos réparations'  content={(toggleModal) => (
               <MachineForm client={client} toggle={toggleModal} />
        )} />
         
        </div>
      </div>
      </>
  )
}

export default ClientInformation