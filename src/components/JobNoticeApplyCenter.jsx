import './css/JobNoticeApplyCenter.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { IsEnrollContext } from '../App';

const JobNoticeApplyCenter = () => {
  const nav = useNavigate();
  const { setIsEnroll } = useContext(IsEnrollContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      nav('/SingIn');
      alert('You must log in to use this feature.');
    }
  }, [nav]);

  const [input, setInput] = useState({
    title: '',
    job_role: '',
    experience: '',
    employment_type: '',
    dead_date: '',
    location: '',
    skills: '',
    description: '',
  });

  const [showSection2, setShowSection2] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = () => {
    const {
      title,
      job_role,
      experience,
      employment_type,
      dead_date,
      location,
      skills,
      description,
      image,
    } = input;

    if (
      !title ||
      !job_role ||
      !experience ||
      !employment_type ||
      !dead_date ||
      !location ||
      !skills ||
      !description
    ) {
      alert('Please fill out all input fields.');
      return;
    }
    if (!selectedFile) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('enterprise_user_id', username);
    formData.append('image', selectedFile);
    formData.append(
      'job',
      JSON.stringify({
        title,
        description,
        jobRole: job_role,
        experience,
        employmentType: employment_type,
        deadDate: dead_date,
        location,
        skills,
        views: 0,
      })
    );
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    fetch('http://3.36.90.4:8080/api/jobs', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert('Registration successful!');
        setIsEnroll(true);
        nav('/JobNotice/');
      })
      .catch((error) => {
        // console.error("Error submitting the form", error);
        alert('Registration failed!');
      });
  };

  const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const handleProceed = () => {
    const {
      title,
      job_role,
      experience,
      employment_type,
      dead_date,
      location,
      skills,
    } = input;

    if (
      !title ||
      !job_role ||
      !experience ||
      !employment_type ||
      !dead_date ||
      !location ||
      !skills
    ) {
      alert('Please fill out all input fields.');
      return;
    }

    if (!validateDate(dead_date)) {
      alert(
        'Deadline is not in the correct format. Please enter in YYYY-MM-DD format.'
      );
      return;
    }

    setShowSection2(true);
  };

  return (
    <div className="JobNoticeApplyCenter">
      <div className="gap2" />
      <div className="sections-wrapper">
        <section className={`section1 ${showSection2 ? 'hidden' : ''}`}>
          <br />
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                className="sectionInput"
                type="text"
                name="title"
                placeholder="ex) Looking for kitchen assistant."
                value={input.title}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>job&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                className="sectionInput"
                type="text"
                name="job_role"
                placeholder="ex) kitchen assistant"
                value={input.job_role}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>
                career&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <input
                type="text"
                name="experience"
                placeholder="ex) 3 years or more"
                value={input.experience}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>Employment type</span>
              <input
                type="text"
                name="employment_type"
                placeholder="ex) day laborer"
                value={input.employment_type}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>deadline</span>
              <input
                type="text"
                name="dead_date"
                placeholder="ex) 2024-08-29"
                value={input.dead_date}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>Working area</span>
              <input
                type="text"
                name="location"
                placeholder="ex) Nakwon-dong, Jongno-gu, Seoul"
                value={input.location}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>skill&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="text"
                name="skills"
                placeholder="ex) Material preparation, cleaning"
                value={input.skills}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <br />
          <button onClick={handleProceed}>Continue</button>
        </section>
        <section className={`section2 ${showSection2 ? '' : 'hidden'}`}>
          <span className="jobdes">
            Job description, application qualifications, preferential treatment,
            working days,
          </span>
          <span className="jobdes">
            Please explain your working hours, application methods, etc.!
          </span>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <textarea
              name="description"
              value={input.description}
              onChange={onChangeInput}
              className="sectionInput"
            />
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="file"
              name="image"
              onChange={onFileChange}
              className="sectionInput"
            />
          </div>
          <button onClick={onSubmit}>registration</button>
        </section>
      </div>
    </div>
  );
};

export default JobNoticeApplyCenter;
