import React,{ useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

type StatusType = "IN_PROGRESS" | "COMPLETED" | "DELIVERED" ;
type DropDownType = {
  setChosed: (status: StatusType) => void;
  Data: StatusType[];
};

const StatusDropDown = ({ setChosed, Data } : DropDownType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status ,setStatus] = useState<string>(Data[0] || "Select Status");

  const toggleDropdown = () => {
    if (Data.length !== 0) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (status: StatusType) => {
      setChosed(status); 
      setStatus(status);
      setIsOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className="w-full h-full relative">
      <div 
        className={`flex gap-1 items-center justify-between border border-gray-500 rounded pl-3 pr-3 pt-1 pb-1 cursor-pointer h-full ${
          Data.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={toggleDropdown}
      >
        <span>{status}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <IoIosArrowDown />
        </div>
      </div>

      {/* Dropdown menu, only show if open and Data is not empty */}
      {isOpen && (
        <ul className="border border-gray-500 rounded p-1.5 mt-0.5 absolute z-10 w-full bg-white">
          {Data.map((m, index) => (
            <li
              key={index}
              className="p-1 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handleSelect(m)}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropDown;
