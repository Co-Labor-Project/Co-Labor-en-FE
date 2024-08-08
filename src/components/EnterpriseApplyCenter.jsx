import './css/EnterpriseApplyCenter.css';
import './css/SingInCenter.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';

const EnterpriseApplyCenter = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const loginContext = useContext(LoginContext);

  // 현재 로그인된 사용자 가져오기
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      nav('/SingIn');
      alert('You need to log in to use this feature.');
    }
  }, [nav]);

  const containerRef = useRef(null);
  const [regiNum, setRegiNum] = useState('');

  const onChange = (e) => {
    setRegiNum(e.target.value);
    setInput((prevInput) => ({
      ...prevInput,
      enterpriseId: e.target.value,
    }));
  };

  const [input, setInput] = useState({
    enterpriseId: '',
    name: '',
    address1: '',
    address2: '',
    address3: '',
    type: '',
    phoneNumber: '',
    description: '',
  });

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = (json) => {
    console.log('Current Input Field Status', input);
    fetch('http://43.203.208.57:8080/api/enterprises/queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Company Registration Result: ', result);
        if (!alert('Company Registration Successful!')) nav('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Sign-Up Failed!');
      });
  };

  const onCheckRegiNum = async () => {
    let flag = false;

    // 첫 번째 fetch 호출
    const response1 = await fetch(
      `http://43.203.208.57:8080/auth/hasEnterprise?username=${sessionStorage.getItem(
        'username'
      )}`,
      {
        method: 'GET',
        credentials: 'include', // 세션 쿠키 포함
      }
    );
    console.log(response1);

    if (response1.ok) {
      const hasEnterprise = await response1.json();
      if (hasEnterprise) {
        alert('이미 기업이 등록된 회원입니다.');
        flag = true;
        nav('/');
        return; // 이미 기업이 등록된 경우, 함수 종료
      }
    }

    // 두 번째 fetch 호출
    if (!flag) {
      const response2 = await fetch(
        `http://43.203.208.57:8080/api/enterprises/status?enterpriseId=${regiNum}`,
        {
          method: 'GET',
          credentials: 'include', // 세션 쿠키 포함
        }
      );

      const result2 = await response2.json();
      console.log(result2);

      if (result2.status === 1) {
        console.log('This member has already registered a company.');
        console.log(sessionStorage.getItem('username'));

        const response3 = await fetch(
          `http://43.203.208.57:8080/api/enterprises/map?enterpriseId=${regiNum}&username=${sessionStorage.getItem(
            'username'
          )}`,
          {
            method: 'POST',
            credentials: 'include', // 세션 쿠키 포함
          }
        );

        const result3 = await response3.json();
        console.log(result3);

        if (result3.status === 1) {
          alert('Company registration completed!');
          nav('/');
        } else {
          toggle();
        }
      } else {
        alert('Non-existent Business Registration Number');
      }
    }
  };

  const toggle = () => {
    if (containerRef.current) {
      containerRef.current.classList.toggle('sign-in');
      containerRef.current.classList.toggle('sign-up');
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.classList.add('sign-in');
      }, 200);
    }
  }, []);

  return (
    <div className="SingInCenter">
      <div id="container" className="container" ref={containerRef}>
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div
                id="signup-form"
                className="form sign-up"
                // method="post"
                // action="/signup"
              >
                {/* form 내부의 input 요소들 유지 */}
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={input.name}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="text"
                    name="type"
                    placeholder="type"
                    value={input.type}
                    onChange={onChangeInput}
                  />
                </div>

                <div
                  className="input-group"
                  style={{ display: 'flex', gap: '10px' }}
                >
                  <i
                    className="bx bxs-lock-alt"
                    style={{ display: 'flex' }}
                  ></i>
                  <input
                    style={{ flex: 1 }}
                    type="text"
                    name="address1"
                    placeholder="address1"
                    value={input.address1}
                    onChange={onChangeInput}
                  />
                  <input
                    style={{ flex: 1 }}
                    type="text"
                    name="address2"
                    placeholder="address2"
                    value={input.address2}
                    onChange={onChangeInput}
                  />
                  <input
                    style={{ flex: 1 }}
                    type="text"
                    name="address3"
                    placeholder="address3"
                    value={input.address3}
                    onChange={onChangeInput}
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    value={input.phoneNumber}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="text"
                    name="description"
                    placeholder="description"
                    value={input.description}
                    onChange={onChangeInput}
                  />
                </div>
                <button onClick={onSubmit}>Register a Company</button>
                {/* <p>
                  <span>Already have an account?</span>
                  <b onClick={toggle} className="pointer">
                    Sign in here
                  </b>
                </p> */}
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div
                id="signin-form"
                className="form sign-in"
                // method="post"
                // action="/auth/login"
              >
                {/* form 내부의 input 요소들 유지 */}
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    type="text"
                    name="username"
                    placeholder="사업자 번호를 입력해주세요!"
                    onChange={onChange}
                  />
                </div>
                <button type="submit" onClick={onCheckRegiNum}>
                  Verify Business Registration Number
                </button>
              </div>
            </div>
          </div>
          {/* END SIGN IN */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className="row content-row">
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Register a Company</h2>
              <p>Company Verification</p>
            </div>
            <div className="img sign-in"></div>
          </div>
          {/* END SIGN IN CONTENT */}
          {/* SIGN UP CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="img sign-up"></div>
            <div className="text sign-up">
              <h2>Register a Company</h2>
              <p>Enter Information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseApplyCenter;
