import React from 'react';
import './css/RecentReviewList.css';
import RecentReviewItem from './RecentReviewItem';
import './css/common.css';
import { useContext } from 'react';
import { ReviewContext } from '../App';

const RecentReview = ({ data }) => {
  const contextData = useContext(ReviewContext);

  const reviewData =
    Array.isArray(data) && data.length > 0 ? data : contextData;
  const limitData =
    reviewData.length > 10 ? reviewData.slice(0, 10) : reviewData;
  return (
    <>
      <div className="recentReview">
        <div className="title">📝 최근 리뷰</div>
        <div className="gap"></div>

        <div className="recentReviewList">
          {limitData.map((item) => (
            <RecentReviewItem key={item.review_id} {...item} />
          ))}
        </div>
        <div className="gap"></div>
      </div>
    </>
  );
};

export default RecentReview;
