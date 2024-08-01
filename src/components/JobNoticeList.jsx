import React from 'react';
import './css/JobNoticeList.css';
import JobNotieItem from './JobNotieItem';
import FilterBox from './FilterBox';
import { Location, JOB, OPTIONS } from './FilterOption';
import './css/common.css';
import { useContext } from 'react';
import { JobContext } from '../App';

const JobNoticeList = ({
  data,
  searchNull = { enterprises: false, jobs: false, reviews: false },
}) => {
  const contextData = useContext(JobContext);
  const jobData = Array.isArray(data) && data.length > 0 ? data : contextData;
  return (
    <>
      <div className="gap"></div>
      <div className="title">📢 채용 공고</div>
      <div className="gap"></div>
      <div className="jobNoticeFilter">
        <FilterBox option={JOB} />
        <Location />
        <div className="filterSort">
          <FilterBox option={OPTIONS} />
        </div>
      </div>
      {!searchNull.jobs && (
        <div className="JobNoticeList">
          {jobData.map((item) => (
            <JobNotieItem key={item.job_id} {...item} />
          ))}
        </div>
      )}
      {searchNull.jobs && (
        <div className="isNullJobNotice">
          <h3>등록된 채용공고가 없습니다!</h3>
        </div>
      )}
    </>
  );
};

export default JobNoticeList;
