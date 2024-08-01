import React from 'react';
import useScrollFadeIn from '../hooks/fade_in';
import './css/CompanyItem.css';
import { useNavigate, useParams } from 'react-router-dom';
import useEmpty from '../hooks/useEmpty';
const CompanyItem = ({
  photo,
  name,
  address1,
  address2,
  address3,
  enterprise_id,
  type,
  description,
  phone_number,
}) => {
  const nav = useNavigate();
  const parms = useParams();
  const fadeInProps = useScrollFadeIn('up', 1);
  const isObjEmpty = useEmpty(parms);
  if (!photo) {
    photo = 'https://cdn-icons-png.flaticon.com/512/4091/4091968.png';
  }
  const clickHandler = () => {
    if (isObjEmpty) {
      nav(`/CompanyInfo/${enterprise_id}`);
    } else {
      nav(`/Search/${parms.keyword}/${enterprise_id}`);
    }
  };
  return (
    <div className="companyItem" onClick={clickHandler}>
      <div {...fadeInProps}>
        <div className="companyImg">
          <img src={photo} width="100px" height="55px" />
        </div>
        <div className="companyInfo">
          <div className="company_infoName">{name}</div>
          <div className="company_info"> {type}</div>
          <div className="company_info">
            {address1} {address2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
