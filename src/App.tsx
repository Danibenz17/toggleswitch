import ToggleSwitch from "./ToggleSwitch";
import "./ToggleSwitch.css";

function App() {
  const handleToggle = (isChecked: boolean) => {
    console.log(`Toggle switch is ${isChecked ? "on" : "off"}`);
  };

  return (
    <div>
      <ToggleSwitch
        leftLabel="LIGHT"
        rightLabel="DARK"
        onToggle={handleToggle}
        initialChecked={false}
      />
    </div>
  );
}

export default App;
