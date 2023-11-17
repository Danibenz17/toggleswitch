import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

export interface SubOption {
  id: number;
  label: string;
  selected?: boolean;
}

interface MainOption {
  key: string;
  label: string;
  options: SubOption[];
}

const sampleData: MainOption[] = [
  {
    key: "option1",
    label: "Royal Enfield",
    options: [
      { id: 1, label: "Interceptor 650" },
      { id: 2, label: "Classic 350" },
      { id: 3, label: "Himalayan" },
    ],
  },
  {
    key: "option2",
    label: "Yamaha",
    options: [
      { id: 4, label: "R15" },
      { id: 5, label: "MT150" },
    ],
  },
  {
    key: "option3",
    label: "Honda",
    options: [
      { id: 6, label: "Shine" },
      { id: 7, label: "Unicorn" },
      { id: 8, label: "Activa" },
    ],
  },
];

const Dropdown = () => {
  const [openMain, setOpenMain] = useState<string | null>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMainOptionClick = (optionKey: string) => {
    setOpenMain((prev) => (prev === optionKey ? null : optionKey));
  };

  const handleSubMenuClick = (subOptionLabel: string) => {
    console.log("Selected:", subOptionLabel);
    setOpenMain(null);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    setTimeout(() => {
      if (
        !currentTarget.contains(document.activeElement) &&
        openMain &&
        mainMenuRef.current &&
        !mainMenuRef.current.contains(document.activeElement)
      ) {
        setOpenMain(null);
      }
    }, 0);
  };

  return (
    <div className="dropdown-container" onBlur={handleBlur} tabIndex={0}>
      <div
        className="select-text"
        ref={buttonRef}
        onClick={() => setOpenMain((prev) => (prev ? null : "main"))}
      >
        Select
        <span className={`select-arrow ${openMain ? "open" : ""}`}>
          &#9662;
        </span>
      </div>
      {openMain && (
        <div className="options-dropdown" ref={mainMenuRef} >
          {sampleData.map((option) => (
            <div
              key={option.key}
              className="option"
              onClick={() => handleMainOptionClick(option.key)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {sampleData.map((option) => (
        <div key={option.key}>
          {openMain === option.key && (
            <div className="submenu">
              {option.options.map((subOption) => (
                <div
                  key={subOption.id}
                  className="sub-option"
                  onClick={() => handleSubMenuClick(subOption.label)}
                >
                  {subOption.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;



