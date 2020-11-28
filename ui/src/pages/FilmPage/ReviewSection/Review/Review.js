import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Input from "../../../../components/UiItem/Input/Input";
import Textarea from "../../../../components/UiItem/Textarea/Textarea";
import "./Review.scss";

const Review = (props) => (
  <TransitionGroup className="reviewWrapper" component={"div"}>
    {props.reviews.map((review) => (
      <CSSTransition
        key={review.id}
        timeout={{ enter: 500, exit: 500 }}
        classNames="review"
      >
        <div className="reviewCard">
          <div className="reviewHead">
            <div className="reviewAuthorName">{review.username}</div>
            <div className="rightSide">
              <div className="reviewDate">{review.datetime}</div>
              <div
                className="delete"
                onClick={() => props.onRemoveClick(review.id)}
              >
                ✖
              </div>
            </div>
          </div>
          <div className="reviewsTitle">
            <Input
              id={review.id}
              value={review.title}
              onChange={(event) => props.onEditInputChange(event, review.id)}
              disabled={!review.open}
            />
          </div>
          <div className="reviewText">
            <Textarea
              id={review.id}
              value={review.message}
              onChange={(event) => props.onEditTextareaChange(event, review.id)}
              disabled={!review.open}
            />
          </div>
          <div className="reviewEdit">
            <div
              id={review.id}
              onClick={() =>
                !review.open
                  ? props.onOpenClick(review.id)
                  : props.onSaveClick(review.id)
              }
            >
              <span>&#9998;</span>
              {review.open === true ? "Сохранить" : "Редактировать"}
            </div>
          </div>
        </div>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default Review;
