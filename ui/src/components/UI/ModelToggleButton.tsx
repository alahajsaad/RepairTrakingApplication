import Button from "./Button";
import Modal from "./Modal";
import useToggle from "../../Hooks/useToggle";
import { IoMdAdd } from "react-icons/io";

import { IconType } from "react-icons";
import React from "react";
type ModelTypes = {
  content: (toggleModal: () => void) => React.ReactNode;
    title? : string ,
    icon? : IconType ,
    ModalTitle :string,
} 
const ModelToggleButton = ({content , ModalTitle ,title , icon = IoMdAdd} : ModelTypes) => {
  const [isModalOpen, toggleModal] = useToggle(false);
  return (
    <div>
        <Button title={title} icon={icon} onClick={toggleModal}/>
        <Modal ModalTitle={ModalTitle} isEditing={isModalOpen} setIsEditing={toggleModal}>
         {content(toggleModal)}
         </Modal>
    </div>
   
  )
}

export default ModelToggleButton