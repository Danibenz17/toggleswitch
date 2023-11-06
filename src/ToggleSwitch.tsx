import React, { useState } from "react";

interface ToggleSwitchProps {
  leftLabel: string;
  rightLabel: string;
  onToggle: (isChecked: boolean) => void;
  initialChecked?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  leftLabel,
  rightLabel,
  onToggle,
  initialChecked = false,
}) => {
  const [isChecked, setChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setChecked(newChecked);
    onToggle(newChecked);
  };

  return (
    <div className="toggle-switch">
      <label>
        {leftLabel}
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider round"></span>
        {rightLabel}
      </label>
    </div>
  );
};

export default ToggleSwitch;
