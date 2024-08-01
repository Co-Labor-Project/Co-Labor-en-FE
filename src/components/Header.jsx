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
      alert('❌ 검색어를 입력해 주세요!');
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
        alert('기업 등록을 먼저 해주세요!');
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
      <div onClick={() => nav('/CompanyInfo')}>기업 정보</div>
      <div onClick={() => nav('/JobNotice')}>채용 공고</div>
      {!loginState.userEnterprise && (
        <div onClick={() => nav('/IegalAdvice')}>법률 상담</div>
      )}
      <div onClick={() => nav('/Support')}>노동자 지원센터</div>

      <div className="searchBox">
        <input
          type="text"
          className="searchBoxInner"
          placeholder="기업 정보와 채용 공고, 기업 리뷰를 검색해보세요!"
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
            채용공고 등록
          </div>
        )}
        {loginState.userEnterprise && (
          <div
            className="enterpriseApply"
            onClick={() => {
              nav('/EnterpriseApply');
            }}
          >
            기업 등록
          </div>
        )}
      </div>
      {!loginState.userLogin && !loginState.userEnterprise && (
        <div onClick={() => nav('/SingIn')}>로그인 / 회원가입</div>
      )}
    </div>
  );
};

export default Header;
