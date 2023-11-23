import React, {
  CSSProperties,
  FocusEventHandler,
  useRef,
  useState,
} from "react";

export interface SubOption {
  id: number;
  label: string;
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
  const [openMain, setOpenMain] = useState<string | null>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submenuSearchQuery, setSubmenuSearchQuery] = useState<string>("");
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMainOptionClick = (optionKey: string) => {
    if (openMain === optionKey) {
      setOpenMain(null);
    } else {
      setOpenMain(optionKey);
    }
  };

  const handleSubMenuClick = (subOptionLabel: string) => {
    console.log("Selected:", subOptionLabel);
    setOpenMain(null);
    setSubmenuSearchQuery("");
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    const currentTarget = event.currentTarget;

    setTimeout(() => {
      if (
        !currentTarget.contains(document.activeElement) &&
        openMain &&
        mainMenuRef.current &&
        !mainMenuRef.current.contains(document.activeElement)
      ) {
        setSearchQuery("");
        setOpenMain(null);
        setSubmenuSearchQuery("");
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

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmenuSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSubmenuSearchQuery(e.target.value);
  };

  const filteredOptions = sampleData.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubmenuOptions = sampleData.map((option) => ({
    key: option.key,
    label: option.label,
    options: option.options.filter((subOption) =>
      subOption.label.toLowerCase().includes(submenuSearchQuery.toLowerCase())
    ),
  }));
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
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {filteredOptions.map((option) => (
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
                onClick={(e) => e.stopPropagation()}
              >
                {openMain === option.key && (
                  <div className="submenu">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search..."
                      value={submenuSearchQuery}
                      onChange={handleSubmenuSearchChange}
                    />
                    {filteredSubmenuOptions
                      .find((opt) => opt.key === option.key)
                      ?.options.map((subOption) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
