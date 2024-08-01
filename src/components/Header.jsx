import React, { useState, useContext } from 'react';
import './css/Header.css';
import searchIcon from '../assets/search_icon.png';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';

const Header = () => {
  const nav = useNavigate();
  const { loginState, setLoginState } = useContext(LoginContext);
  const [searchKeyword, setSearchKeyword] = useState('');
  const changeInput = (e) => {
    setSearchKeyword(e.target.value);
  };
  const searchHandler = () => {
    if (searchKeyword === '') {
      alert('❌ Please enter a search term!');
    } else {
      nav(`/search/${searchKeyword}`);
      setSearchKeyword('');
    }
    console.log(loginState);
  };
  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      searchHandler();
    }
  };

  const handleJobNoticeApply = async () => {
    try {
      const response1 = await fetch(
        `http://3.36.90.4:8080/auth/hasEnterprise?username=${sessionStorage.getItem(
          'username'
        )}`,
        {
          method: 'GET',
          credentials: 'include', // 세션 쿠키 포함
        }
      );

      const hasEnterprise = await response1.json();

      if (!hasEnterprise) {
        alert('Please register your company first!');
        nav('/');
      } else {
        nav('/JobNoticeApply');
      }
    } catch (error) {
      console.error('Error checking enterprise:', error);
    }
  };

  return (
    <div className="Header">
      <div className="logo" onClick={() => nav('/')}></div>
      <div onClick={() => nav('/CompanyInfo')}>Company Information</div>
      <div onClick={() => nav('/JobNotice')}>Job Postings</div>
      {!loginState.userEnterprise && (
        <div onClick={() => nav('/IegalAdvice')}>Legal Consultation</div>
      )}
      <div onClick={() => nav('/Support')}>Worker Support Center</div>

      <div className="searchBox">
        <input
          type="text"
          className="searchBoxInner"
          placeholder="Search for company information, job postings, and company reviews!"
          onChange={changeInput}
          onKeyDown={keyHandler}
        />
        <img
          className="searchBoxIcon"
          src={searchIcon}
          onClick={searchHandler}
        />
      </div>
      <div className="right-child">
        {loginState.userEnterprise && (
          <div className="jobNoticeApply" onClick={handleJobNoticeApply}>
            Post a Job
          </div>
        )}
        {loginState.userEnterprise && (
          <div
            className="enterpriseApply"
            onClick={() => {
              nav('/EnterpriseApply');
            }}
          >
            <main></main>
            Register a Company
          </div>
        )}
      </div>
      {!loginState.userLogin && !loginState.userEnterprise && (
        <div onClick={() => nav('/SingIn')}>Login / Sign Up</div>
      )}
    </div>
  );
};

export default Header;
