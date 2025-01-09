import React from 'react';

type FormValues = {
  Inputs:React.ReactNode ;
  buttons: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const Form = ({ Inputs,buttons, onSubmit }: FormValues) => {
  return (
    <div className='p-4 m-4 rounded shadow-custom w-[50vw]'>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-2 w-fit'>
          {Inputs}
        </div>
        <div className='flex justify-end mt-[20px]'>
          {buttons}
        </div>
      </form>
    </div>
  );
};

export default Form;
