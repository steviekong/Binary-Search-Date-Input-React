import React, { useState } from "react";
import "./styles.scss";

const MAX_POSSIBLE_DATE: number = 8640000000000000;

interface props {
  onChange: (value: Date) => void;
}

const BinarySearchDateInput: React.FC<props> = ({ onChange }) => {
  // Lowest date possible in javascript
  const [low, setLow] = useState(-MAX_POSSIBLE_DATE);
  // Highest date possible in javascript
  const [high, setHigh] = useState(MAX_POSSIBLE_DATE);
  const calculateMid = (low: number, high: number) => {
    return low + Math.floor((high - low) / 2);
  };
  const [mid, setMid] = useState<number>(calculateMid(low, high));

  const onLowClick = () => {
    setHigh(mid - 1);
    const newMid = calculateMid(low, mid - 1);
    setMid(newMid);
  };

  const onHighClick = () => {
    setLow(mid + 1);
    const newMid = calculateMid(mid + 1, high);
    setMid(newMid);
    onChange(new Date(mid));
  };

  const reset = () => {
    setLow(-MAX_POSSIBLE_DATE);
    setHigh(MAX_POSSIBLE_DATE);
    setMid(calculateMid(-MAX_POSSIBLE_DATE, MAX_POSSIBLE_DATE));
    onChange(new Date(mid));
  };

  return (
    <div>
      <div className="root">
        <button onClick={onLowClick}>Lower</button>
        <p className="date-display">{new Date(mid).toLocaleDateString()}</p>
        <button onClick={onHighClick}>Higher</button>
      </div>
      <div className="reset-container">
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default BinarySearchDateInput;
