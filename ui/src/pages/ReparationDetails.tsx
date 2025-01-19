import { pdf } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import UpdateReparationForm from '../components/Forms/UpdateReparationForm';
import RepairReport from '../components/PDFReports/RepairReport';
import ReparationDetailsClient from '../components/ReparationComponents/ReparationDetailsClient';
import ReparationDetailsMachine from '../components/ReparationComponents/ReparationDetailsMachine';
import Button from '../components/UI/Button';
import ModelToggleButton from '../components/UI/ModelToggleButton';
import { useReparation } from '../context/ReparationContext'; // Import the custom hook
const ReparationDetails = () => {
  //const [reparation, setReparation] = useState<Reparation | null>(null);
  const { id } = useParams<{ id: string }>();
  const { reparation, fetchReparation } = useReparation();
  useEffect(() => {
     fetchReparation(id!);
  }, [id,fetchReparation]);

  const handleGeneratePdf = async () => {
   
      if (reparation) {

         // Generate PDF blob
        const blob = await pdf(<RepairReport reparation={reparation} />).toBlob();

        // Create a new window with the PDF content
        const pdfWindow = window.open('', '_blank');
        if (pdfWindow) {
          const url = URL.createObjectURL(blob);
          pdfWindow.location.href = url;
        }

      } else {
        console.error('Reparation data is missing.');
      }
   
  };
  
  

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
      <div className='flex flex-col justify-between h-full'>
        <div>
          <div className="flex items-center justify-between m-1">
            <p>Travaux effectués :</p>
            <ModelToggleButton ModalTitle="Ajouter ou modifier les travaux effectués" icon={FaRegEdit} content={(toggleModal) => (
                  <UpdateReparationForm reparation={reparation} toggle={toggleModal}/>
            )} />
          </div>
          <div className="border-2 border-gray-200 rounded p-2 bg-gray-100 text-black w-[70%] min-h-[100px]">
            <p>
              {reparation.descriptionTravail}
            </p>
          </div>
        </div>

      

        <div className="flex justify-end mt-5">
          <Button onClick={handleGeneratePdf} title="Imprimer le rapport" />
        </div>
      </div>
    )}
  </div>

    </div>
  );
};

export default ReparationDetails;
