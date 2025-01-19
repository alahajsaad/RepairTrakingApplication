import { Client } from '../../types/Client';
import ClientForm from '../Forms/ClientForm';
import ModelToggleButton from '../UI/ModelToggleButton'

import { FaRegEdit } from "react-icons/fa";

type ReparationDetailsClientProps ={
    client : Client ;
}

const ReparationDetailsClient = ({client} : ReparationDetailsClientProps) => {

  return (
    <div className='card w-[25vw]'>
          <div className='flex items-baseline justify-between pb-1'>
              <h3 className='text-lg font-semibold'>Client Details</h3>
              
              <ModelToggleButton ModalTitle='mettre à jour votre client' icon={FaRegEdit} content={(toggleModal) => (
                       <ClientForm client={client} toggle={toggleModal} />
              )} />
              
          </div>
          
          <p><strong>Nom:</strong> {client.name}</p>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Numéros de téléphone :</strong> {client.phoneNbsList.map((phone, index) => (
            <span key={index} className="block">{phone.number}</span>
          ))}</p>
        </div>
  )
}

export default ReparationDetailsClient