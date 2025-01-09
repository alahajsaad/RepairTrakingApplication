import React from "react";
import { useId } from "react";
import { IconType } from "react-icons";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Label for the input
  onblur?: () => void;
  onfocus?: () => void;
  icon?: IconType; // Optional icon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", onblur, onfocus, label, icon: Icon, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
          </label>
        )}
        {Icon ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              id={id}
              type={type}
              ref={ref} // Forward the ref for react-hook-form
              {...props} // Spread remaining props
              className={`block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
              onBlur={onblur}
              onFocus={onfocus}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              id={id}
              type={type}
              ref={ref} // Forward the ref
              {...props} // Spread remaining props
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
              onBlur={onblur}
              onFocus={onfocus}
            />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // Set display name for debugging

export { Input };
