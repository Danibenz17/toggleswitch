import React, { useState, useContext } from "react";
import ToggleSwitch from "./ToggleSwitch";

interface DropdownProps {
  data: {
    key: string;
    label: string;
    options: { id: number | string; label: string }[];
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  const [selectedMainOption, setSelectedMainOption] = useState<string | null>(
    null
  );
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);
  const [includeMode, setIncludeMode] = useState<boolean>(true);

  const handleMainOptionSelect = (mainOption: string) => {
    setSelectedMainOption(mainOption);
  };

  const handleSubOptionSelect = (subOption: string) => {
    if (selectedSubOptions.includes(subOption)) {
      setSelectedSubOptions(
        selectedSubOptions.filter((option) => option !== subOption)
      );
    } else {
      setSelectedSubOptions([...selectedSubOptions, subOption]);
    }
  };

  const toggleIncludeMode = () => {
    setIncludeMode(!includeMode);
  };

  return (
    <div>
      <select
        value={selectedMainOption || ""}
        onChange={(e) => handleMainOptionSelect(e.target.value)}
      >
        <option value="">Select</option>
        {data.map((mainOption) => (
          <option key={mainOption.key} value={mainOption.key}>
            {mainOption.label}
          </option>
        ))}
      </select>

      {selectedMainOption && (
        <div>
          <div>
            <label>
              Main option:{" "}
              {data.find((main) => main.key === selectedMainOption)?.label}
            </label>
          </div>
          <div>
            {data
              .find((main) => main.key === selectedMainOption)
              ?.options.map((subOption) => (
                <div key={subOption.id}>
                  <input
                    type="checkbox"
                    value={subOption.id}
                    checked={selectedSubOptions.includes(
                      subOption.id.toString()
                    )}
                    onChange={() =>
                      handleSubOptionSelect(subOption.id.toString())
                    }
                  />
                  {subOption.label}
                </div>
              ))}
          </div>
        </div>
      )}

      {selectedMainOption && selectedSubOptions.length > 0 && (
        <div>
          <div>
            Filter Pill:{" "}
            {data.find((main) => main.key === selectedMainOption)?.label}:{" "}
            {selectedSubOptions.join(" or ")}{" "}
            <ToggleSwitch
              onToggle={toggleIncludeMode}
              leftLabel={"Inclue"}
              rightLabel={"Exclude"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
