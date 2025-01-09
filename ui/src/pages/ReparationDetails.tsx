import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Reparation } from '../types/Reparation';
import reparationService from '../services/reparationService';
import ReparationDetailsClient from '../components/ReparationComponents/ReparationDetailsClient';
import ReparationDetailsMachine from '../components/ReparationComponents/ReparationDetailsMachine';
import Button from '../components/UI/Button';
import { FaRegEdit } from "react-icons/fa";
import ModelToggleButton from '../components/UI/ModelToggleButton';
import UpdateReparationForm from '../components/Forms/UpdateReparationForm';

const ReparationDetails = () => {
  const [reparation, setReparation] = useState<Reparation | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchReparation = async () => {
      if (!id) return; // Vérifie que l'id est défini
      try {
        const reparationId = parseInt(id, 10); // Conversion en nombre si nécessaire
        const response = await reparationService.getReparationById(reparationId);
        setReparation(response);
      } catch (error) {
        console.error('Failed to fetch reparation:', error);
      }
    };

    fetchReparation();
  }, [id]);

  if (!reparation) {
    return <div>No reparation data found.</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col w-fit">
        {reparation.machine.client && (
          <ReparationDetailsClient client={reparation.machine.client} />
        )}
        {reparation.machine && <ReparationDetailsMachine machine={reparation.machine} />}
      </div>
      <div className="card w-full">
  {!reparation.descriptionTravail ? (
    <div className="flex flex-col items-center justify-center text-center mt-12">
      <p>Ajoutez vos travaux effectués !</p>
      <ModelToggleButton ModalTitle='Ajouter les travaux effectués' icon={FaRegEdit} content={(toggleModal) => (
                      <UpdateReparationForm reparation={reparation} toggle={toggleModal}/>
      )} />
    </div>
  ) : (
    <div>
      <div className="flex items-center justify-between m-1">
        <p>Travaux effectués :</p>
        <ModelToggleButton ModalTitle="Ajouter ou modifier les travaux effectués" icon={FaRegEdit} content={(toggleModal) => (
              <UpdateReparationForm reparation={reparation} toggle={toggleModal}/>
        )} />
      </div>

      <p className="border-2 border-gray-500 rounded p-2">
        {reparation.descriptionTravail}
      </p>

      <div className="flex justify-end mt-5">
        <Button title="Imprimer le rapport" />
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default ReparationDetails;
