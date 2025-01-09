import { useEffect, useState } from 'react';
import { Input } from '../UI/Input';
import Button from '../UI/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '../UI/Select';

const formSchema = z.object({
  ClientPhoneNumber: z.string().nullish(),
  MachineRef: z.string().nullish(), // Allow null or empty value
});

type FormValues = z.infer<typeof formSchema>;

type ReparationFilterFormType = {
  toggle: (isEditing: boolean) => void;
  setClientPhoneNumber: (phone: string) => void;
  setMachineRef: (ref: string) => void;
  Machine?: string;
  Client?: string;
};

const ReparationFilterForm = ({ setMachineRef, setClientPhoneNumber, toggle, Machine, Client }: ReparationFilterFormType) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>({resolver: zodResolver(formSchema)});
  const [clientOption, setClientOption] = useState<string>(Client ? 'Recherche par téléphone' : 'Tous les clients');
  const [machineOption, setMachineOption] = useState<string>(Machine ? 'Recherche par référence' : 'Toutes les machines');
  
  const onSubmit = (data: FormValues) => {
    setClientPhoneNumber(clientOption === 'Recherche par téléphone' ? data.ClientPhoneNumber || '' : '');
    setMachineRef(machineOption === 'Recherche par référence' ? data.MachineRef || '' : '');
    toggle(false);
    reset();
  };

  useEffect(() => {
    setValue('ClientPhoneNumber', Client);
    setValue('MachineRef', Machine);
  }, [Client, Machine, setValue]);

  return (
    <form className="card" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 w-fit">
        {/* Client Selection */}
        <Select options={['Tous les clients', 'Recherche par téléphone']} selectedOption={clientOption} setOption={setClientOption} />
        {clientOption === 'Recherche par téléphone' && <Input placeholder="TEL:" {...register('ClientPhoneNumber')} />}
        {errors.ClientPhoneNumber && <p className="error">{errors.ClientPhoneNumber.message}</p>}
        
        {/* Machine Selection */}
        <Select options={['Toutes les machines', 'Recherche par référence']} selectedOption={machineOption} setOption={setMachineOption} />
        {machineOption === 'Recherche par référence' && <Input placeholder="REF:" {...register('MachineRef')} />}
        {errors.MachineRef && <p className="error">{errors.MachineRef.message}</p>}
      </div>
      
      <div className="flex justify-end mt-5">
        <Button type="submit" title="Submit" />
      </div>
    </form>
  );
};

export default ReparationFilterForm;
