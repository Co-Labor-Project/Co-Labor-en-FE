import React from 'react';
import './css/SupportCenterItem.css';
const SupportCenterItem = ({ name, address, phone }) => {
  return (
    <div className="SupportCenterItem">
      <p>name: {name}</p>
      <p>address: {address}</p>
      <p>phone: {phone}</p>
    </div>
  );
};

export default SupportCenterItem;
