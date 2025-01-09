import React from 'react';

type SelectType = {
    options: string[];
    setOption: (option: string) => void;
    selectedOption: string;
}

const Select = ({ options, setOption, selectedOption }: SelectType) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOption(event.target.value);
    };

    return (
        <select
            className="border border-gray-300 rounded-md p-3 bg-white shadow-sm hover:shadow-md transition-all ease-in-out duration-200 text-gray-700 cursor-pointer"
            onChange={handleSelectChange}
            value={selectedOption}  
        >
            {options.map((option, key) => (
                <option key={key} value={option} className="cursor-pointer">
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Select;
