import React, { useState, useEffect } from 'react';
import './css/JobNoticeItem.css';
import useScrollFadeIn from '../hooks/fade_in';
import { useNavigate, useParams } from 'react-router-dom';
import useEmpty from '../hooks/useEmpty';

const JobNotieItem = ({
  imageName,
  title,
  requirement,
  enterprise,
  job_id,
  jobRole,
  experience,
  employmentType,
  location,
  skills,
  deadDate,
}) => {
  const fadeInProps = useScrollFadeIn('up', 1);
  const nav = useNavigate();
  const parms = useParams();
  const isObjEmpty = useEmpty(parms);
  const name = enterprise?.name || 'No Enterprise Name';
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Gn8yBWZsQEVzdXIx-qFWrYYlphEWWnG4Og&s';
  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    const checkImage = async () => {
      if (!imageName) {
        return;
      }

      const url = `http://43.203.208.57:8080/static/images/${imageName}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          setImageSrc(url);
        } else if (response.status === 404) {
          const fallbackUrl = `http://43.203.208.57:8080/api/jobs/images/${imageName}`;
          const fallbackResponse = await fetch(fallbackUrl);
          if (fallbackResponse.ok) {
            setImageSrc(fallbackUrl);
          } else {
            setImageSrc(defaultImage);
          }
        } else {
          setImageSrc(defaultImage);
        }
      } catch (error) {
        setImageSrc(defaultImage);
      }
    };

    checkImage();
  }, [imageName]);

  const clickHandler = () => {
    if (
      isObjEmpty ||
      parms.keyword === 'undefined' ||
      parms.keyword === undefined
    ) {
      nav(`/JobNotice/${job_id}`);
    } else {
      nav(`/Search/${parms.keyword}/jobNotice/${job_id}`);
    }
  };

  return (
    <div {...fadeInProps}>
      <div className="JobNotieItem" onClick={clickHandler}>
        <div>
          <div className="jobNoticeInfo">
            <div className="jobNotice_infoName">{name}</div>
          </div>
          <img className="jobNoticeImg" src={imageSrc} alt={title} />
        </div>
        <div className="jobNoticeInfo">
          <div className="jobNotice_infoTitle">{title}</div>
          <div className="jobNotice_infoCondi">Deadline: {deadDate}</div>
          <div className="jobNotice_infoCondi">job : {jobRole}</div>
          <div className="jobNotice_infoCondi">
            Employment type: {employmentType}
          </div>
          <div className="jobNotice_infoCondi">Working area:{location}</div>
        </div>
      </div>
    </div>
  );
};

export default JobNotieItem;
