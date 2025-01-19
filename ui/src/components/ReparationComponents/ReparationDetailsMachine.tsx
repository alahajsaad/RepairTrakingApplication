
import { FaRegEdit } from "react-icons/fa";
import { Machine } from '../../types/Machine';
import MachineForm from '../Forms/MachineForm';
import ModelToggleButton from '../UI/ModelToggleButton';
type ReparationDetailsMachineProps ={
    machine : Machine ;
   
} 

const ReparationDetailsMachine = ({machine } : ReparationDetailsMachineProps) => {
  return (
    <div className='card w-[25vw]'>
      <div className='flex items-baseline justify-between pb-1'>
              <h3 className='text-lg font-semibold mb-2'>Machine Details</h3>
              <ModelToggleButton ModalTitle='mettre à jour votre Machine' icon={FaRegEdit} content={(toggleModal) => (
                       <MachineForm machine={machine} client={machine.client}  toggle={toggleModal} />
              )} />
              
      </div>
      
      <p><strong>Référence:</strong> {machine.reference}</p>
      <p><strong>Désignation:</strong> {machine.designation}</p>
    </div>
  )
}

export default ReparationDetailsMachine