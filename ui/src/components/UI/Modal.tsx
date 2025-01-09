import React, { useEffect, useRef } from 'react';
import { IoMdClose } from "react-icons/io";
type ModalValues = {
    children: React.ReactNode,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    ModalTitle : string
}

const Modal = ({ children,ModalTitle, isEditing, setIsEditing }: ModalValues) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function closeModal() {
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isEditing]);

  return (
    <dialog ref={dialogRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-0 border-none rounded-lg shadow-md bg-white backdrop-blur: blur(8px)">
      <div className='flex flex-col'>
        <div className='flex items-center justify-between p-4 border-b border-gray-400'>
          <p>{ModalTitle}</p>
          <IoMdClose className='cursor-pointer text-2xl text-black transition-colors duration-300 hover:text-red-500' onClick={closeModal} />
        </div>
        <div className='p-4'>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
