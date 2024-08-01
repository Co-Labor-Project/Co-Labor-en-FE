import React, { useEffect, useState } from 'react';
import './css/SearchOutput.css';
import JobNoticeList from './JobNoticeList';
import CompanyList from './CompanyList';
import { useParams } from 'react-router-dom';

const SearchOutput = ({ input }) => {
  const [enterprises, setEnterprises] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearchNull, setIsSearchNull] = useState({
    enterprises: false,
    jobs: false,
    reviews: false,
  });
  const [isAI, setIsAi] = useState(true);
  const url = window.location.href;
  let desURL = '';
  if (url.indexOf('AiSearch') === -1) {
    desURL = `http://3.36.90.4:8080/search?keyword=${input}`;
  } else {
    desURL = `http://43.202.57.234:8081/ai-search?sentence=${input}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(desURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            credentials: 'include',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to Load Data');
        }
        if (desURL.indexOf('AiSearch') === -1) {
          setIsAi(false);
          console.log('isAI', isAI);
        }
        console.log(response);

        const data = await response.json();
        setEnterprises(data.enterprises || []);
        setJobs(data.jobs || []);
        setReviews(data.reviews || []);

        console.log(data.enterprises);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [input]);

  useEffect(() => {
    if (enterprises.length === 0) {
      setIsSearchNull((prevInput) => ({
        ...prevInput,
        enterprises: true,
      }));
    } else {
      setIsSearchNull((prevInput) => ({
        ...prevInput,
        enterprises: false,
      }));
    }
    if (jobs.length === 0) {
      setIsSearchNull((prevInput) => ({
        ...prevInput,
        jobs: true,
      }));
    } else {
      setIsSearchNull((prevInput) => ({
        ...prevInput,
        jobs: false,
      }));
    }
    if (reviews.length === 0) {
      setIsSearchNull((prevInput) => ({
        ...prevInput,
        reviews: true,
      }));
    } else {
      setIsSearchNull((prevInput) => ({
        ...prevInput,
        reviews: false,
      }));
    }
  }, [enterprises, jobs, reviews]);
  const params = useParams();

  return (
    <div>
      <div className="inputText">
        <h2> &quot;{input}&quot; Search Results</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CompanyList data={enterprises} searchNull={isSearchNull} />
          <JobNoticeList data={jobs} searchNull={isSearchNull} />
        </>
      )}
      <div className="gap"></div>
    </div>
  );
};

export default SearchOutput;
