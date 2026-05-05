import React from "react";
import '../styles/pottery-dropdown.css'

const PotteryDropdown = ({ visible, onSelect }) => {
  const categories = [
    'Terracotta',
    'Glazed Pottery',
    'Sculptural',
  ];

  return (
    <div className={`pottery-dropdown ${visible ? "pottery-dropdown-show" : ""}`}>
      {categories.map((cat) => (
        <p key={cat} onClick={() => onSelect(cat)}>{cat}</p>
      ))}
    </div>
  );
};

export default PotteryDropdown;