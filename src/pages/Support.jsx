// src/pages/Support.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SupportCenterMap from '../components/SupportCenterMap';
import { Container as MapDiv } from 'react-naver-maps';

const Support = () => {
  return (
    <div>
      <Header />
      <MapDiv
        style={{
          width: '100%',
          height: '600px',
        }}
      >
        <SupportCenterMap />
      </MapDiv>
      <div className="gap"></div>
      <Footer />
    </div>
  );
};

export default Support;
