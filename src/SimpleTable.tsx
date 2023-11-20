import React, { createContext, useReducer, useContext, useState, ReactNode } from "react";

interface RowData {
  id: number;
  name: string;
  age: number;
  ug: string;
}

interface State {
  selectedRows: number[];
  selectAll: boolean;
  newName: string;
  newAge: number;
  newUg: string;
  rows: RowData[];
}

type Action =
  | { type: "SELECT_ALL" }
  | { type: "SELECT_ROW"; id: number }
  | {
      type: "ADD_ROW";
      payload: { newName: string; newAge: number; newUg: string };
    }
  | { type: "DELETE_ROW"; id: number | number[] };

const initialState: State = {
  selectedRows: [],
  selectAll: false,
  newName: "",
  newAge: 0,
  newUg: "",
  rows: [
    { id: 1, name: "Dani", age: 23, ug: "BSC CS" },
    { id: 2, name: "Sasi", age: 22, ug: "BSC Maths" },
    { id: 3, name: "Priya", age: 24, ug: "BSC Maths" },
    { id: 4, name: "ibrahim", age: 25, ug: "BE CS" },
  ],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SELECT_ALL":
      return {
        ...state,
        selectedRows: state.selectAll ? [] : state.rows.map((row) => row.id),
        selectAll: !state.selectAll,
      };
    case "SELECT_ROW":
      const updatedSelectedRows = state.selectedRows.includes(action.id)
        ? state.selectedRows.filter((selectedId) => selectedId !== action.id)
        : [...state.selectedRows, action.id];

      return {
        ...state,
        selectedRows: updatedSelectedRows,
      };
    case "ADD_ROW":
      const { newName, newAge, newUg } = action.payload;
      if (newName.trim() !== "" && newAge !== 0 && newUg.trim() !== "") {
        const newId = state.rows.length + 1;
        const newRow: RowData = {
          id: newId,
          name: newName,
          age: newAge,
          ug: newUg,
        };

        return {
          ...state,
          rows: [...state.rows, newRow],
          newName: "",
          newAge: 0,
          newUg: "",
        };
      }
      return state;

    case "DELETE_ROW":
      let updatedRows: RowData[];
      if (Array.isArray(action.id)) {
        const idsToDelete = action.id as number[];
        updatedRows = state.rows.filter((row) => !idsToDelete.includes(row.id));
      } else {
        const idToDelete = action.id as number;
        updatedRows = state.rows.filter((row) => row.id !== idToDelete);
      }

      return {
        ...state,
        rows: updatedRows,
        selectedRows: [],
        selectAll: false,
      };
    default:
      return state;
  }
};

interface TableContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

interface DataTableProviderProps {
  children: ReactNode;
}

export function DataTableProvider({ children }: DataTableProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a DataTableProvider");
  }
  return context;
};


const DataTable = () => {
  const { state, dispatch } = useTable();
  const { selectedRows, selectAll, rows } = state;
  const [newName, setNewName] = useState<string>("");
  const [newAge, setNewAge] = useState<number>(0);
  const [newUg, setNewUg] = useState<string>("");
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]'
      );

      const currentIndex = Array.from(checkboxes).findIndex(
        (checkbox) => document.activeElement === checkbox
      );

      const newIndex =
        e.key === "ArrowUp"
          ? (currentIndex - 1 + checkboxes.length) % checkboxes.length
          : (currentIndex + 1) % checkboxes.length;

      checkboxes[newIndex].focus();
    }
  };

  const handleSelectAll = () => {
    dispatch({ type: "SELECT_ALL" });
  };

  const handleSelectRow = (id: number) => {
    dispatch({ type: "SELECT_ROW", id });
  };

  const isSelected = (id: number) => selectedRows.includes(id);

  const handleAdd = () => {
    dispatch({
      type: "ADD_ROW",
      payload: {
        newName,
        newAge,
        newUg,
      },
    });
  };

  const handleDelete = (ids: number | number[]) => {
    dispatch({ type: "DELETE_ROW", id: ids });
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} role="grid">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Age</th>
            <th>UG</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} role="row">
              <td tabIndex={0}>
                <input
                  type="checkbox"
                  checked={isSelected(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.ug}</td>
              <td>
                <button onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={newAge}
          onChange={(e) => setNewAge(parseInt(e.target.value))}
        />
        <input
          type="text"
          placeholder="UG"
          value={newUg}
          onChange={(e) => setNewUg(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={() => handleDelete(selectedRows)}>Bulk Delete</button>
      </div>
    </div>
  );
};

export default DataTable;