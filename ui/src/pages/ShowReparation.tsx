import { useEffect, useState, useMemo } from 'react';
import { VscSettings } from 'react-icons/vsc';
import { Reparation } from '../types/Reparation';
import reparationService from '../services/reparationService';
import ModelToggleButton from '../components/UI/ModelToggleButton';
import ReparationFilterForm from '../components/Forms/ReparationFilterForm';
import Table from '../components/Table/Table';
import Button from '../components/UI/Button';




export type ReparationFilter = {
  ClientPhoneNumber?: string;
  MachineRef?: string;
};

const ShowReparation = () => {
  const [reparations, setReparations] = useState<Reparation[]>([]);
 
  const [reparationFilter, setReparationFilter] = useState<ReparationFilter>({
    ClientPhoneNumber: "",
    MachineRef: "",
  });
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const updateFilter = (key: keyof ReparationFilter, value: string | undefined) => {
    setReparationFilter((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchReparations = async () => {
      try {
        const { content, totalPages } = await reparationService.getFilteredReparation(reparationFilter || {}, page);
        setReparations(content);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Failed to fetch reparations:', error);
      }
    };
  
    fetchReparations();
  }, [reparationFilter, page]);
  

  const tableData = useMemo(() => {
    return reparations.map((reparation) => ({
      id: reparation.id,
      callNumber: reparation.callNumber,
      designation: reparation.machine.designation,
      client: reparation.machine.client.name,
      phoneNumber: reparation.machine.client.phoneNbsList.map((phone) => phone.number).join(', '),
    })) || [];
  }, [reparations]);


 
  

  return (
    <div className="p-4 m-4 rounded shadow-custom mt-[5vh]">
      <div className="flex items-center gap-5 mb-3">
        
        <ModelToggleButton
          ModalTitle="Filtrez vos réparations"
          icon={VscSettings}
          content={(toggleModal) => (
            <ReparationFilterForm
              setMachineRef={(ref) => updateFilter("MachineRef", ref)}
              Machine={reparationFilter.MachineRef}
              setClientPhoneNumber={(phone) => updateFilter("ClientPhoneNumber", phone)}
              Client={reparationFilter.ClientPhoneNumber}
              toggle={toggleModal}
            />

          )}
        />
      </div>
      <Table head={["Id", "Numéro d'appel", "Designation", "Client", "Numéro de Téléphone"]} route="/reparation/details" data={tableData} />
      <div className="flex items-center justify-end gap-2 mt-3">
        <Button disable={page === 0} title="Previous" onClick={() => setPage((prev) => prev - 1)} />
        <Button disable={page >= totalPages - 1} title="Next" onClick={() => setPage((prev) => prev + 1)} />
      </div>
    </div>
  );
};

export default ShowReparation;
