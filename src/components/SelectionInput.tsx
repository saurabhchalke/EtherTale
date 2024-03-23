import { useState } from 'react';

interface SelectionInputProps {
  title: string;
  options: string[];
  allowCustomInput?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const SelectionInput: React.FC<SelectionInputProps> = ({
  title,
  options,
  allowCustomInput = false,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={title} className="block mb-2 font-bold text-gray-300">
        {title}
      </label>
      <select
        id={title}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {allowCustomInput && (
        <input
          type="text"
          placeholder="Enter custom input"
          value={value}
          onChange={handleChange}
          className="mt-2 w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      )}
    </div>
  );
};

export default SelectionInput;