import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Review.scss";

const Review = (props) => (
  <TransitionGroup className="reviewWrapper" component={"div"}>
    {props.reviews.map((review) => (
      <CSSTransition key={review.id} timeout={500} classNames="review">
        <div className="reviewCard">
          <div className="reviewHead">
            <div className="reviewAuthorName">{review.name}</div>
            <div className="rightSide">
              <div className="reviewDate">{review.date}</div>
              <div
                className="delete"
                onClick={() => props.onRemoveClick(review.id)}
              >
                ✖
              </div>
            </div>
          </div>
          <div className="reviewsTitle">{review.title}</div>
          <div className="reviewText">{review.text}</div>
          <div className="reviewEdit">
            <a
              href="/film/2/user/4?review=5"
              onChange={() => props.onChangeClick(review.id)}
            >
              <span>&#9998;</span> Редактировать
            </a>
          </div>
        </div>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default Review;
