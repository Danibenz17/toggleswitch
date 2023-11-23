import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

 interface SubOption {
  id: number;
  label: string;
  selected?: boolean;
}
interface PillToggleSwitchProps {
  selectedSubOptions: SubOption[];
}

const PillToggleSwitch: React.FC<PillToggleSwitchProps> = ({ selectedSubOptions }) => {
  const [isOf, setIsOf] = useState(true);
  const handleToggle = (isChecked: boolean) => {
    setIsOf(isChecked);
  };

  const pillSize = selectedSubOptions.filter((subOption) => subOption.selected).length;

  const pillClassName = `pill ${isOf ? "red" : "green"} ${pillSize > 0 ? "with-sub-options" : ""}`;

  return (
    <div className={pillClassName}>
      <ToggleSwitch
        leftLabel="Include"
        rightLabel="Exclude"
        onToggle={handleToggle}
        initialChecked={isOf}
      />
      <div className="selected-suboptions">
        <div className="selected-suboptions-row">
          {selectedSubOptions
            .filter((subOption) => subOption.selected)
            .map((subOption) => (
              <div key={subOption.id} className="selected-suboption">
                {subOption.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PillToggleSwitch;
