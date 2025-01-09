import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { Machine } from '../../types/Machine';


type DropDownType = {
  setChosed: (id: number) => void; // Corrected type
  Data : Machine[];
};

const DropDown = ({ setChosed, Data } : DropDownType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [machine ,setMachine] =useState<string>() ;
  const toggleDropdown = () => {
    if (Data.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };
  const handleSelect = (machine: Machine) => {
      setChosed(machine.id); 
      setMachine(machine.designation)
      setIsOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className="w-full relative">
      {/* Apply disabled styles if Machines is empty */}
      <div 
        className={`flex gap-1 items-center justify-between border border-gray-500 rounded pl-3 pr-3 pt-1 pb-1 cursor-pointer ${
          Data.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={toggleDropdown}
      >
        {/* Show 'No machines available' if Machines is empty */}
        <span>{Data.length > 0 ? machine : 'Aucune machine trouvée'}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <IoIosArrowDown />
        </div>
      </div>

      {/* Dropdown menu, only show if open and Machines is not empty */}
      {isOpen && Data.length > 0 && (
        <ul className="border border-gray-500 rounded p-1.5 mt-0.5 absolute z-10 w-full bg-white">
          {Data.map((m) => (
            <li
              key={m.id} // Use unique identifier
              className="p-1 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handleSelect(m)}
            >
              {m.designation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
