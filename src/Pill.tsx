import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const PillToggleSwitch = () => {
  const [isGreen, setIsGreen] = useState(true);
  const handleToggle = (isChecked: boolean) => {
    setIsGreen(isChecked);
  };

  return (
    <div className={`pill ${isGreen ? "red" : "green"}`}>
      <ToggleSwitch
        leftLabel="Include"
        rightLabel="Exclude"
        onToggle={handleToggle}
        initialChecked={isGreen}
      />
    </div>
  );
};

export default PillToggleSwitch;
