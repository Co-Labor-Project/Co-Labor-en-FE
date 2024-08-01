import React from 'react';
import './css/FilterBox.css';

const FilterBox = (props) => {
  return (
    <select>
      {props.option.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default FilterBox;
