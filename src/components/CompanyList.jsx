import React, { useContext, useState, useRef, useEffect } from 'react';
import CompanyItem from './CompanyItem';
import { useNavigate } from 'react-router-dom';
import './css/CompanyList.css';
import FilterBox from './FilterBox';
import { Location, JOB } from './FilterOption';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { CompanyContext } from '../App';

const CompanyList = ({ data, searchNull }) => {
  const contextData = useContext(CompanyContext);
  console.log(contextData);
  const companyData =
    Array.isArray(data) && data.length > 0 ? data : contextData;
  const nav = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleItems, setVisibleItems] = useState(12);
  const listRef = useRef();
  const [viewAll, setViewAll] = useState(false);

  const changeInput = (e) => {
    setSearchKeyword(e.target.value);
  };

  const arr1 = companyData.length < 12 ? companyData : companyData.slice(0, 12);

  const itemsToShow = viewAll ? companyData : arr1;

  const searchHandler = () => {
    if (searchKeyword === '') {
      alert('❌ Please enter a search term!');
    } else {
      nav(`/AiSearch/${searchKeyword}`);
      setSearchKeyword('');
    }
  };

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      searchHandler();
    }
  };

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1 }
    )
  );

  const [target, setTarget] = useState(null);

  useEffect(() => {
    const currentElement = target;
    const currentObserver = observer.current;

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [target]);

  useEffect(() => {
    if (viewAll && target) {
      observer.current.observe(target);
    }
  }, [viewAll, target]);

  const moreButton = () => {
    setViewAll(true);
    loadMoreItems();
  };

  return (
    <div>
      <div className="searchContainer">
        <TextField
          className="companylist_AI_search"
          label="🤖 Search anything with AI! "
          multiline
          maxRows={4}
          color="success"
          onChange={changeInput}
          onKeyDown={keyHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  onClick={searchHandler}
                  style={{ cursor: 'pointer' }}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="gap"></div>
      <div className="title">🏢 Company Information</div>
      <div className="gap"></div>

      <div className="jobNoticeFilter">
        <FilterBox option={JOB} />
        <Location />
      </div>

      <div className="companyList" ref={listRef}>
        {itemsToShow.slice(0, visibleItems).map((item) => (
          <CompanyItem key={item.enterprise_id} {...item} />
        ))}
        {viewAll && visibleItems < companyData.length && (
          <div ref={setTarget} className="loading">
            <div className="LoadingWrapper">
              <div className="loading-spinner"></div>
              <p>🤖 Loading company information...</p>
            </div>
          </div>
        )}
      </div>
      {!viewAll && companyData.length > 12 && (
        <button onClick={moreButton} className="w-btn w-btn-indigo">
          More
        </button>
      )}
    </div>
  );
};

export default CompanyList;
