import "./ToggleSwitch.css";
import "./Pill.css";
import "./Dropdown.css";
import "./Password.css";
import "./SimpleTable.css";
import DataTable, { DataTableProvider } from "./SimpleTable";
import Dropdown from "./Dropdown";

function App() {
  return (
    <div>
      {/* <DataTableProvider>
        <DataTable />
      </DataTableProvider> */}
      <Dropdown/>
    </div>
  );
}

export default App;
