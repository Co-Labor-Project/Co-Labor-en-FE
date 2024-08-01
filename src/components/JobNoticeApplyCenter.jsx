import "./css/JobNoticeApplyCenter.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext } from "react";
import { IsEnrollContext } from "../App";

const JobNoticeApplyCenter = () => {
  const nav = useNavigate();
  const { setIsEnroll } = useContext(IsEnrollContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      nav("/SingIn");
      alert("이 기능을 사용하려면 로그인이 필요합니다.");
    }
  }, [nav]);

  const [input, setInput] = useState({
    title: "",
    job_role: "",
    experience: "",
    employment_type: "",
    dead_date: "",
    location: "",
    skills: "",
    description: "",
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
      alert("모든 입력 필드를 채워주세요.");
      return;
    }
    if (!selectedFile) {
      alert("이미지를 업로드 해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("enterprise_user_id", username);
    formData.append("image", selectedFile);
    formData.append(
      "job",
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

    fetch("http://3.36.90.4:8080/api/jobs", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert("등록 성공!");
        setIsEnroll(true);
        nav("/JobNotice/");
      })
      .catch((error) => {
        // console.error("Error submitting the form", error);
        alert("등록 실패!");
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
      alert("모든 입력 필드를 채워주세요.");
      return;
    }

    if (!validateDate(dead_date)) {
      alert(
        "마감 기한이 올바른 형식이 아닙니다. YYYY-MM-DD 형식으로 입력해주세요."
      );
      return;
    }

    setShowSection2(true);
  };

  return (
    <div className="JobNoticeApplyCenter">
      <div className="gap2" />
      <div className="sections-wrapper">
        <section className={`section1 ${showSection2 ? "hidden" : ""}`}>
          <br />
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                className="sectionInput"
                type="text"
                name="title"
                placeholder="ex) 주방 보조 구합니다."
                value={input.title}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>직무&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                className="sectionInput"
                type="text"
                name="job_role"
                placeholder="ex) 주방 보조"
                value={input.job_role}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>경력&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="text"
                name="experience"
                placeholder="ex) 3년 이상"
                value={input.experience}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>고용형태</span>
              <input
                type="text"
                name="employment_type"
                placeholder="ex) 일용직"
                value={input.employment_type}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>마감기한</span>
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
              <span>근무지역</span>
              <input
                type="text"
                name="location"
                placeholder="ex) 서울특별시 종로구 낙원동"
                value={input.location}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <div className="input-group">
            <i className="bx bxs-lock-alt"></i>
            <div className="wrapper">
              <span>스킬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="text"
                name="skills"
                placeholder="ex) 재료 손질, 청소"
                value={input.skills}
                onChange={onChangeInput}
                className="sectionInput"
              />
            </div>
          </div>
          <br />
          <button onClick={handleProceed}>이어서 진행하기</button>
        </section>
        <section className={`section2 ${showSection2 ? "" : "hidden"}`}>
          <span className="jobdes">
            업무내용, 지원자격, 우대사항, 근무요일,
          </span>
          <span className="jobdes">근무시간, 지원방법 등을 설명해주세요!</span>
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
          <button onClick={onSubmit}>등록하기</button>
        </section>
      </div>
    </div>
  );
};

export default JobNoticeApplyCenter;
