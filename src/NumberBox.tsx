import React, { useState } from "react";

const NumberBox = () => {
  const [count, setCount] = useState<number>(0)
  const [increment, setIncreament] = useState<number>(1)
  
  const handleIncrease = () => {
    setCount((prevcount) => prevcount + increment);
  }
  const handleDecrease = () => {
    setCount((prevCount) => prevCount - increment);
  }
  const handleReset = () => {
    setCount(0);
  }
  const handleInputChange = (event: { target: { value: string; }; } ) => {
    const value = parseInt(event.target.value)
    setIncreament(value)
  }

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={handleIncrease}>Increament</button>
        <button onClick={handleDecrease}>Decreament</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <label>Increase By</label>
        <input type="number" value={increment} onChange={handleInputChange}></input>
      </div>
    </div>
  );
};

export default NumberBox;

