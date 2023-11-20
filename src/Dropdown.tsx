import React, { CSSProperties, useRef, useState } from "react";

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
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMainOptionClick = (optionKey: string) => {
    setOpenMain((prev) => (prev === optionKey ? null : optionKey));
  };

  const handleSubMenuClick = (subOptionLabel: string) => {
    console.log("Selected:", subOptionLabel);
    setOpenMain(null);
  };
  const dani = handleSubMenuClick

  const handleBlur = (event: { currentTarget: any; }) => {
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
  const handleSubmenuPosition = (optionkey: string) => {
    const mainmenu = mainMenuRef.current?.querySelector(
      `[data-key = "${optionkey}"]`
    );
    const submenu = submenuRefs.current[optionkey];
    if (mainmenu && submenu) {
      const mainOptionposition = mainmenu.getBoundingClientRect();
      const submenuposition = submenu.getBoundingClientRect();

      const submenuwidth = submenuposition.width;
      const submenuTop = mainOptionposition.top - 25;
      const submenuleft = mainOptionposition.right;

      return {
        top: submenuTop,
        left: submenuleft,
        width: submenuwidth,
      };
    }
    return {};
  };

  const submenuStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "100%",
    display: "block",
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
        <div className="options-dropdown" ref={mainMenuRef}>
          {sampleData.map((option) => (
            <div
              key={option.key}
              className="option"
              onClick={() => handleMainOptionClick(option.key)}
              data-key={option.key}
            >
              {option.label}
              <div
                ref={(ref) => {
                  submenuRefs.current[option.key] = ref;
                }}
                style={{
                  ...submenuStyle,
                  ...handleSubmenuPosition(option.key),
                }}
              >
                {openMain === option.key && (
                  <div className="submenu">
                    {option.options.map((subOption) => (
                      <div
                        key={subOption.id}
                        className="sub-option"
                        onClick={() => dani(subOption.label)}
                      >
                        {subOption.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
