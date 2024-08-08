import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JobContext, CompanyContext } from '../App';
import JobNotieItem from './JobNotieItem';
import './css/JobNoticeDetailsCenter.css';
import './css/common.css';

const JobNoticeDetailsCenter = () => {
  const params = useParams();
  const contextData = useContext(JobContext);
  const companyContext = useContext(CompanyContext);
  const jobId = params.job_id;
  const nav = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [displayJobPhoto, setDisplayJobPhoto] = useState('');

  useEffect(() => {
    const job = contextData.find(
      (item) => String(item.job_id) === String(jobId)
    );
    if (job) {
      setJobData(job);
      const company = companyContext.find(
        (item) =>
          String(item.enterprise_id) === String(job.enterprise.enterprise_id)
      );
      setCompanyData(company);

      if (job.imageName) {
        const checkImage = async () => {
          const url = `http://43.203.208.57:8080/static/images/${job.imageName}`;
          try {
            const response = await fetch(url);
            if (response.ok) {
              setDisplayJobPhoto(url);
            } else if (response.status === 404) {
              const fallbackUrl = `http://43.203.208.57:8080/api/jobs/images/${job.imageName}`;
              const fallbackResponse = await fetch(fallbackUrl);
              if (fallbackResponse.ok) {
                setDisplayJobPhoto(fallbackUrl);
              } else {
                setDisplayJobPhoto(
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Gn8yBWZsQEVzdXIx-qFWrYYlphEWWnG4Og&s'
                );
              }
            }
          } catch (error) {
            console.error('Error fetching image:', error);
            setDisplayJobPhoto(
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Gn8yBWZsQEVzdXIx-qFWrYYlphEWWnG4Og&s'
            );
          }
        };

        setDisplayJobPhoto(''); // 초기화하여 이전 이미지가 남지 않도록 함
        checkImage();
      } else {
        setDisplayJobPhoto(
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Gn8yBWZsQEVzdXIx-qFWrYYlphEWWnG4Og&s'
        );
      }
    }
  }, [jobId, contextData, companyContext]);

  if (!jobData || !companyData) {
    return <div>Loading</div>;
  }

  const displayCompanyPhoto = companyData.imageName
    ? `http://43.203.208.57:8080/static/images/${companyData.imageName}`
    : 'https://cdn-icons-png.flaticon.com/512/4091/4091968.png';

  const defaultCompanyType = 'Please categorize the companies!';
  const displayCompanyType = companyData.type || defaultCompanyType;

  const defaultCompanyDescription = 'Please categorize the companies!';
  const displayCompanyDescription =
    companyData.description || defaultCompanyDescription;

  const highlightWords = [
    'Preferred Qualifications',
    'Hiring Process',
    'Qualifications',
    'Hiring Process',
    'Easy Application',
    'First Interview',
    'Second Interview',
    'Final Acceptance',
    'Work Environment',
    'Benefits',
    'Core Tasks',
    'Organization Introduction',
    'Team Message',
    'Benefits',
    'Welfare and Benefits',
    'Core Tasks',
  ];

  const applyHighlighting = (text) => {
    let highlightedText = text;
    highlightWords.forEach((word) => {
      const regex = new RegExp(word, 'g');
      highlightedText = highlightedText.replace(regex, `<b>${word}</b>`);
    });
    return highlightedText;
  };
  const descriptionWithHighlights = applyHighlighting(jobData.description);

  return (
    <div className="JobDetail">
      <div className="gap2"></div>
      <div className="CompanyDetail">
        <h1 className="title">{companyData.name}</h1>
        <div className="gap" />
        <div className="JobDetailsBasicInfo">
          <img
            className="JobCompanyImg"
            src={displayCompanyPhoto}
            alt={companyData.title}
          />
          <div className="JobNDetailsCondi">
            <div className="JobDetailKey">
              <p>Address </p>{' '}
              <span>
                {companyData.address1} {companyData.address2}{' '}
                {companyData.address3}
              </span>
            </div>
            <div className="JobDetailKey">
              <p>Number</p> <span>{companyData.phone_number}</span>
            </div>
            <div className="JobDetailKey">
              <p>Category </p> <span>{displayCompanyType}</span>
            </div>
            <div className="JobDetailKey">
              <p>Description </p>
              <span>{displayCompanyDescription}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap" />
      <h1 className="title">{jobData.title}</h1>
      <div className="gap" />
      <div className="JobDetailsBasicInfo">
        <img
          className="JobDetailsImg"
          src={displayJobPhoto}
          alt={jobData.title}
        />
        <div className="JobNDetailsCondi">
          <div className="JobDetailKey">
            <p>deadline</p> <span>{jobData.deadDate}</span>
          </div>

          <div className="JobDetailKey">
            <p>contact</p> <span>{jobData.enterpriseUser.email}</span>
          </div>
          <div className="JobDetailKey">
            <p>job </p> <span>{jobData.jobRole}</span>
          </div>
          <div className="JobDetailKey">
            <p>career </p>
            <span>{jobData.experience}</span>
          </div>
          <div className="JobDetailKey">
            <p>type </p> <span>{jobData.employmentType}</span>
          </div>
          <div className="JobDetailKey">
            <p>location </p>
            <span>{jobData.location}</span>
          </div>
          <div className="JobDetailKey">
            <p>skill </p>
            <span>{jobData.skills}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="JobDetailsdescription">
        <pre dangerouslySetInnerHTML={{ __html: descriptionWithHighlights }} />
      </div>
      <div className="gap2" />
      <h1 className="title">Related Announcements</h1>
      <div className="gap" />

      <div className="JobDetailsBasicInfo">
        <div className="JobNoticeList">
          {contextData.map((item) => (
            <JobNotieItem key={item.job_id} {...item} />
          ))}
        </div>
      </div>
      <div className="gap" />
    </div>
  );
};

export default JobNoticeDetailsCenter;
