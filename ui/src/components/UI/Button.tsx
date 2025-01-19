import React from 'react';
import { IconType } from 'react-icons';

interface MyButtonProps {
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: IconType; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string; 
  disable?: boolean; // Mark disable as optional with a default value
  testId?: string;

}

const Button: React.FC<MyButtonProps> = ({ title, type = 'button', icon: Icon, onClick, className, disable = false ,testId}) => {
  const defaultClasses = 'text-blue-600 bg-white hover:bg-blue-600 hover:text-white border border-blue-600 font-medium rounded text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-colors duration-200 ease-in-out flex items-center gap-1';
  const disabledClasses = 'bg-gray-300 text-gray-500 border-gray-300 font-medium rounded text-sm px-5 py-2.5 '; // Prevent hover styles when disabled
  

  return (
    <button 
      
      data-testid={testId}

      type={type}
      onClick={disable ? undefined : onClick} // Disable the onClick handler if the button is disabled
     // className={`${className ? className : defaultClasses} ${disable ? disabledClasses : ''}`} 
      className={`${disable ? disabledClasses : defaultClasses} ${className}`}
      disabled={disable} // Disable the button element
    >
      {Icon && <Icon />} {/* Render the icon component if provided */}
      {title}
    </button>
  );
};

export default Button;
