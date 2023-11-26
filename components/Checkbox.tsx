// NFTCard.tsx

import React, { useState } from "react";
import styles from "../styles/Home.module.css";

interface CheckboxProps {
  tokenId: number;
  onCheckboxChange: (tokenId: number, isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ tokenId, onCheckboxChange }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
    onCheckboxChange(tokenId, !isChecked);
  };

  return (<div >
    <div >
      {/* ... (existing code) */}

      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
    </div>
  );
};

export default Checkbox;
