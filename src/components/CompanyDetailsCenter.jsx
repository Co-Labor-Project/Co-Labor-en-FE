import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CompanyContext, JobContext, ReviewContext } from '../App';
import './css/CompanyDetailsCenter.css';
import StarRate from './StarRate';
import BarGraph from './BarGraph';
import RadarChart from './RadarChart';

const CompanyDetailsCenter = () => {
  const params = useParams();
  const reviewContext = useContext(ReviewContext);
  const companyContext = useContext(CompanyContext);
  const jobContext = useContext(JobContext);
  const nav = useNavigate();
  // useEffect(() => {
  // console.log(params, companyContext);
  // console.log(params, jobContext);
  // }, []);

  const companyData = companyContext.find(
    (company) => String(company.enterprise_id) === String(params.enterprise_id)
  );

  const reviewData = reviewContext.filter(
    (review) =>
      String(review.enterprise.enterprise_id) === String(params.enterprise_id)
  );

  const jobData = jobContext.filter(
    (job) =>
      String(job.enterprise.enterprise_id) === String(params.enterprise_id)
  );
  // console.log(jobContext.map((job) => job.enterprise));
  // console.log(jobContext[353]);
  // console.log(jobData);
  // console.log(companyData);
  // console.log(jobData);
  // console.log(reviewData);

  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    setTotalReviews(reviewData.length);
  }, [reviewData]);

  // console.log(jobContext);
  if (!companyData) {
    return <div>Loading</div>;
  }

  const defaultCompanyimageName =
    'https://cdn-icons-png.flaticon.com/512/4091/4091968.png';
  const displayCompanyimageName = companyData.imageName
    ? 'http://43.203.208.57:8080/static/images/' + companyData.imageName
    : defaultCompanyimageName;

  const defaultCompanyType = 'Please categorize the companies!';
  const displayCompanyType = companyData.type || defaultCompanyType;

  const defaultCompanyDescription = 'Please provide a company description!';
  const displayCompanyDescription =
    companyData.description || defaultCompanyDescription;

  const defaultJobimageName =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Gn8yBWZsQEVzdXIx-qFWrYYlphEWWnG4Og&s';
  const displayJobimageName = (job) =>
    job.imageName
      ? 'http://43.203.208.57:8080/static/images/' + job.imageName
      : defaultJobimageName;

  // 리뷰 각 평점의 평균을 계산하는 함수
  const calculateAverageRatings = (reviews) => {
    const totalRatings = reviews.length;
    if (totalRatings === 0) return {};

    const sumRatings = reviews.reduce(
      (acc, review) => {
        acc.total += review.rating;
        acc.promotion += review.promotion_rating;
        acc.salary += review.salary_rating;
        acc.balance += review.balance_rating;
        acc.culture += review.culture_rating;
        acc.management += review.management_rating;
        return acc;
      },
      {
        total: 0,
        promotion: 0,
        salary: 0,
        balance: 0,
        culture: 0,
        management: 0,
      }
    );

    return {
      averageTotal: (sumRatings.total / totalRatings).toFixed(1),
      averagePromotion: (sumRatings.promotion / totalRatings).toFixed(1),
      averageSalary: (sumRatings.salary / totalRatings).toFixed(1),
      averageBalance: (sumRatings.balance / totalRatings).toFixed(1),
      averageCulture: (sumRatings.culture / totalRatings).toFixed(1),
      averageManagement: (sumRatings.management / totalRatings).toFixed(1),
    };
  };

  const averageRatings = calculateAverageRatings(reviewData);

  const clickHandler = (jobId) => {
    nav(`/JobNotice/${jobId}`);
  };

  return (
    <div className="CompanyDetail">
      <br />
      <br />
      <div className="CompanyDetailsCenterCompany">
        <h1 className="title">{companyData.name} Basic Information</h1>
        <div className="gap"></div>
        <div className="CompanyDetailsCenterCompanyBasicInfo">
          <img
            className="CompanyDetailsCenterCompanyImg"
            src={displayCompanyimageName}
            alt={companyData.name}
          />
          <div className="CompanyDetailsCenterCompanyText">
            <div className="CompanyDetailsCenterCompanyAddress">
              Address: {companyData.address1} {companyData.address2}{' '}
              {companyData.address3}
            </div>
            <div className="CompanyDetailsCenterCompanyPh">
              Number: {companyData.phone_number}
            </div>
            <div className="CompanyDetailsCenterCompanyType">
              Category: {displayCompanyType}
            </div>
            <div className="CompanyDetailsCenterCompanyDes">
              Description:{displayCompanyDescription}
            </div>
          </div>
        </div>
      </div>

      <div className="gap"></div>
      <div className="gap2"></div>

      <div className="CompanyDetailsCenterJob">
        <h1 className="title">{companyData.name} Job Postings</h1>
        <div className="gap2"></div>
        <div className="CompanyDetailsCenterJobList">
          {jobData.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={-110}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              width="1000"
            >
              {jobData.map((job) => (
                <SwiperSlide key={job.job_id}>
                  <div
                    className="CompanyDetailsCenterJobItem"
                    onClick={() => clickHandler(job.job_id)}
                  >
                    <div className="CompanyDetailsCenteritemWrapper">
                      <div className="CompanyDetailsCenterjobNoticeInfo">
                        <div className="CompanyDetailsCenterjobNotice_infoTitle">
                          {job.title}
                        </div>
                        <img
                          className="CompanyDetailsCenterjobNoticeImg"
                          src={displayJobimageName(job)}
                          width="100px"
                          alt={job.title}
                        />
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Deadline :{job.deadDate}
                        </div>
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Requirements : {job.requirement}
                        </div>
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Position : {job.jobRole}
                        </div>
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Experience : {job.experience}
                        </div>
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Employment Type : {job.employmentType}
                        </div>
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Location : {job.location}
                        </div>
                        <div className="CompanyDetailsCenterjobNotice_infoCondi">
                          Skills : {job.skills}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="CompanyDetailsCenterjobNotice_infoTitle">
              No job postings available.
            </div>
          )}
        </div>
      </div>
      <div className="gap2" />

      <h1 className="title">{companyData.name} Overall Review Statistics</h1>
      <div className="gap" />

      <div className="CompanyDetailsCenterAllReview">
        <div className="CompanyDetailsCenterAllReviewitemWrapper">
          <div style={{ marginTop: '10px' }}>
            <span>{totalReviews}reviews</span>
            <StarRate rating={averageRatings.averageTotal} />
            <br />
            <br />
          </div>
          <div>
            <span>Promotion Opportunities and Personal Growth Potential: </span>
            <BarGraph rating={averageRatings.averagePromotion} />
            <br />
          </div>
          <div>
            <span>Benefits and Salary: </span>
            <BarGraph rating={averageRatings.averageSalary} />
            <br />
          </div>
          <div>
            <span>Work-Life Balance: </span>
            <BarGraph rating={averageRatings.averageBalance} />
            <br />
          </div>
          <div>
            <span>Company Culture Rating: </span>
            <BarGraph rating={averageRatings.averageCulture} />
            <br />
          </div>
          <div>
            <span>Management Rating: </span>
            <BarGraph rating={averageRatings.averageManagement} />
            <br />
          </div>
        </div>
        <div className="CompanyDetailsCenterAllReviewitemWrapper">
          <RadarChart data={averageRatings} />
        </div>
      </div>

      <div className="CompanyDetailsCenterReview">
        <h1 className="title">{companyData.name} Review</h1>
        <div className="gap" />
        <div className="CompanyDetailsCenterReviewList">
          {reviewData.length > 0 ? (
            reviewData.map((review) => (
              <div key={review.review_id}>
                <div className="CompanyDetailsCenterReviewitemWrapper">
                  <h5>{review.title}</h5>
                  <div className="CompanyDetailsCenterReviewInfo">
                    <div>
                      {review.created_at}Author : {review.laborUser.name}
                    </div>
                    <StarRate rating={review.rating} />
                    <div>
                      Promotion Opportunities and Personal Growth Potential
                    </div>
                    <BarGraph rating={review.promotion_rating} />
                    <div>Benefits and Salary</div>
                    <BarGraph rating={review.salary_rating} />
                    <div>Work-Life Balance</div>
                    <BarGraph rating={review.balance_rating} />
                    <div>Company Culture Rating</div>
                    <BarGraph rating={review.culture_rating} />
                    <div>Management Rating</div>
                    <BarGraph rating={review.management_rating} />
                    <div>Pros</div>
                    <div>{review.pros}</div>
                    <div>Cons</div>
                    <div>{review.cons}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="CompanyDetailsCenterjobNotice_infoTitle">
              No reviews available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsCenter;
