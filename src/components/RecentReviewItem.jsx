import React from "react";
import "./css/RecentReviewItem.css";
import useScrollFadeIn from "../hooks/fade_in";
import { useNavigate, useParams } from "react-router-dom";

const RecentReviewItem = ({
  photo,
  title,
  rating,
  pros,
  cons,
  created_at,
  enterprise,
  review_id,
}) => {
  const fadeInProps = useScrollFadeIn("up", 1);
  const nav = useNavigate();

  if (!photo) {
    photo =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Gn8yBWZsQEVzdXIx-qFWrYYlphEWWnG4Og&s";
  }
  const clickHandler = () => {
    nav(`/CompanyInfo/${enterprise.enterprise_id}`);
  };

  return (
    <div className="recentReviewItem">
      <div {...fadeInProps}>
        <h5>
          <img src={photo} width="30" height="30" />
          {enterprise.name}
        </h5>
        <div className="itemWrapper">
          <div>
            <h2>&quot;{title} &quot;</h2>
          </div>
          <div className="info">
            <div>{pros}</div>
            <div>{cons}</div>
            <div>{created_at}</div>
            <div>{rating}</div>
            <div>{review_id}</div>
          </div>
          <div className="moreBtn" onClick={clickHandler}>
            {" "}
            리뷰 더 확인하기{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentReviewItem;
