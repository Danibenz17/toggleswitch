import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const PillToggleSwitch = () => {
  const [isOf, setIsOf] = useState(true);
  const handleToggle = (isChecked: boolean) => {
    setIsOf(isChecked);
  };

  return (
    <div className={`pill ${isOf ? "red" : "green"}`}>
      <ToggleSwitch
        leftLabel="Include"
        rightLabel="Exclude"
        onToggle={handleToggle}
        initialChecked={isOf}
      />
    </div>
  );
};

export default PillToggleSwitch;
