import React, { useState } from 'react';
import PillToggleSwitch from './Pill';

export type SubOption = {
  id: number;
  label: string;
  selected: boolean;
};

type MainOption = {
  key: string;
  label: string;
  options: SubOption[];
};

const sampleData: MainOption[] = [
  {
    key: 'option1',
    label: 'Royal Enfield',
    options: [
      { id: 1, label: 'Interceptor 650', selected: false },
      { id: 2, label: 'Classic 350', selected: false },
      { id: 3, label: 'Himalayan', selected: false },
    ],
  },
  {
    key: 'option2',
    label: 'Yamaha',
    options: [
      { id: 4, label: 'R15', selected: false },
      { id: 5, label: 'MT150', selected: false },
    ],
  },
  {
    key: 'option3',
    label: 'Honda',
    options: [
      { id: 6, label: 'Shine', selected: false },
      { id: 7, label: 'Unicorn', selected: false },
      { id: 8, label: 'Activa', selected: false },
    ],
  },
];

const Dropdown: React.FC = () => {
  const [selectedMainOption, setSelectedMainOption] = useState<MainOption | null>(null);
  const [subOptions, setSubOptions] = useState<SubOption[]>([]);

  const handleMainOptionChange = (key: string) => {
    const option = sampleData.find((option) => option.key === key);
    setSelectedMainOption(option || null);
    setSubOptions(option ? option.options : []);
  };

  const handleSubOptionClick = (subOption: SubOption) => {
    setSubOptions((prevSubOptions) =>
      prevSubOptions.map((opt) =>
        opt.id === subOption.id ? { ...opt, selected: !opt.selected } : opt
      )
    );
  };

  return (
    <div className="dropdown-container">
      <select
        value={selectedMainOption ? selectedMainOption.key : ''}
        onChange={(e) => handleMainOptionChange(e.target.value)}
      >
        <option value="">Select</option>
        {sampleData.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedMainOption && (
        <div className="sub-options">
          {subOptions.map((subOption) => (
            <div key={subOption.id} className="sub-option">
              <input
                type="checkbox"
                id={`subOption-${subOption.id}`}
                checked={subOption.selected}
                onChange={() => handleSubOptionClick(subOption)}
              />
              <label htmlFor={`subOption-${subOption.id}`}>{subOption.label}</label>
            </div>
          ))}
        </div>
      )}
      <PillToggleSwitch selectedSubOptions={subOptions} />
    </div>
  );
};

export default Dropdown;
