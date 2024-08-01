import React from 'react';
import './css/SupportCenterItem.css';
const SupportCenterItem = ({ name, address, phone }) => {
  return (
    <div className="SupportCenterItem">
      <p>이름: {name}</p>
      <p>주소: {address}</p>
      <p>전화번호: {phone}</p>
    </div>
  );
};

export default SupportCenterItem;
