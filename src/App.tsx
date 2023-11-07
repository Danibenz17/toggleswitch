import PillToggleSwitch from "./Pill";
import "./ToggleSwitch.css";
import "./Pill.css"

function App() {
  const handleToggle = (isChecked: boolean) => {
    console.log(`Toggle switch is ${isChecked ? "on" : "off"}`);
  };

  return (
    <div>
      <PillToggleSwitch />
    </div>
  );
}

export default App;
