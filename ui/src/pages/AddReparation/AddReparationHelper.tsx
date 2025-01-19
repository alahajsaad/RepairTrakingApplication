import { useCallback, useEffect, useMemo, useState } from "react";
import { Client } from "../../types/Client";
import { Machine } from "../../types/Machine";
import clientService from "../../services/clientService";
import machineService from "../../services/machineService";
import reparationService from "../../services/reparationService";
import { ReparationDto } from "../../types/ReparationDto";
import { toast } from 'react-toastify';


const AddReparationHelper = () => {
  const [client , setClient] = useState<Client | undefined>();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachineId , setSelectedMachineId] = useState<number>()
  const [machineError, setMachineError] = useState<string>();
  const [clientError, setclientError] = useState<string>();
  const [callNumber , setCallNumber] = useState<string>() ;

 
  useEffect(() => {
    setMachineError(undefined)
  } , [selectedMachineId]);
  const fetchClient = async (phoneNumber : string) => {
      resetStates()
      try {
        const fetchedClient = await clientService.getClientByPhoneNumber(phoneNumber);
        setClient(fetchedClient);
        if (fetchedClient) {
          fetchMachines(phoneNumber); 
        }
        
      } catch (err) {
        setclientError('Client non trouvé');
        console.log(clientError)
      } 
  };
  const fetchMachines = async (phoneNumber : string) => {
       try {
         const data = await machineService.getMachinesByClientPhoneNumber(phoneNumber) ;
         setMachines(data)
         } catch (error ) {
            console.log("machine error fetchine :"+error)
       }
  };
  const resetStates = () => {
    setClient(undefined);
    setMachines([]);
  };
  const fetchCallNumber = useCallback( async ()=>{
    try {
      const data = await reparationService.initCallNumber() ;
      setCallNumber(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[])

 
  
  
  const addReparation = useCallback(async (desc : string , id : number) => {
    const reparation : ReparationDto ={
      machineId : id ,
      description : desc,
      callNumber : callNumber! 

    }
    try {
      const data = await reparationService.addReparation(reparation)
      setCallNumber(data)
       toast.success('La réparation a été ajoutée avec succès.', {position: 'top-right'});
    } catch (error) {
       toast.error("Erreur lors de l'ajout de la réparation.", {position: 'top-right'});
    }
  },[callNumber ]) 
  
  return {
    addReparation,
    fetchCallNumber,
    callNumber,
    resetStates,
    client,
    setClient,
    machines,
    fetchClient,
    fetchMachines,
    clientError,
    setSelectedMachineId,
    selectedMachineId,  
    machineError,
    setMachineError
  }
}

export default AddReparationHelper