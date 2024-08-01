import React from 'react';
import searchIcon from '../assets/search_icon.png';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from 'react-naver-maps';
import './css/QuickMenu.css';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import JobNotieItem from './JobNotieItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { JobContext } from '../App';

// function MyMap() {
//   const navermaps = useNavermaps();

//   return (
//     <NaverMap
//       defaultCenter={new navermaps.LatLng(36.632473380701, 127.45314301376)}
//       defaultZoom={15}
//     >
//       <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} />
//       <Marker
//         defaultPosition={new navermaps.LatLng(36.632473380701, 127.45314301376)}
//       />
//     </NaverMap>
//   );
// }

const QuickMenu = () => {
  const nav = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const contextData = useContext(JobContext);
  const limitData =
    contextData.length > 12 ? contextData.slice(0, 12) : contextData;
  const changeInput = (e) => {
    setSearchKeyword(e.target.value);
  };

  const searchHandler = () => {
    if (searchKeyword === '') {
      alert('❌Please enter your search term!');
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

  return (
    <div className="QuickMenu">
      <div className="introduce1">
        <TextField
          className="AI_search"
          label="🤖 Search for anything based on AI! "
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
        <div className="jobNoticeIntroduce">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={-40}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            height={3000}
            width={900}
          >
            {limitData.map((item) => (
              <SwiperSlide key={item.enterprise_id}>
                <JobNotieItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="introduce2">
        <div className="banner" />
      </div>
    </div>
  );
};

export default QuickMenu;
