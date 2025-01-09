import React, { useState } from 'react';

type PopoverTypes = {
  trigger: (togglePopover: () => void) => React.ReactNode;
  content: React.ReactNode;
  condition: boolean;  // You can make this more specific if needed
};

const Popover = ({ trigger, content, condition }: PopoverTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <div>
        {/* Trigger the popover when focused or clicked */}
        {trigger(togglePopover)}
      </div>

      {/* Popover only appears if it's open and the condition is true */}
      {isOpen && condition && (
        <div className='mt-1 w-full p-4 absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out'>
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
