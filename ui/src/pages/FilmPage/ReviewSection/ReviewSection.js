import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/UiItem/Button/Button";
import DropdownForm from "./DropdownForm/DropdownForm";
import Review from "./Review/Review";
import Pagination from "./Pagination/Pagination";
import "./ReviewSection.scss";

const ReviewSection = (props) => {
  const [reviews, setReviews] = useState(props.reviews.content);
  const [totalPages, setTotalPages] = useState(props.reviews.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdown, setDropdawn] = useState(false);
  const [reviewButtonActive, setReviewButtonActive] = useState(false);
  const [, setFormControls] = useState("");

  useEffect(() => {
    const verificationReview = async () => {
      const response = await axios.get(`/api/movies/8/reviews/verification`);
      setReviewButtonActive(response.data);
    };
    verificationReview();
  }, [reviews]);

  const paginate = async (pageNumber) => {
    const response = await axios.get(
      `/api/movies/8/reviews?page=${pageNumber - 1}`
    );
    setReviews(response.data.content);
    setCurrentPage(pageNumber);
  };

  const removeReview = async (reviewId) => {
    await axios.delete(`/api/movies/8/reviews/${reviewId}`);

    const response = await axios.get(
      `/api/movies/8/reviews?page=${currentPage - 1}`
    );

    const prevResponse = await axios.get(
      `/api/movies/8/reviews?page=${currentPage - 2}`
    );

    setReviews(
      response.data.content.filter((review) => review.id !== reviewId)
    );
    setCurrentPage(currentPage);

    if (response.data.numberOfElements === 0) {
      setReviews(prevResponse.data.content);
      setCurrentPage(currentPage);
    }

    if (totalPages !== response.data.totalPages) {
      setTotalPages(() => totalPages - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const openHandlerClick = async (reviewId) => {
    const response = await axios.get(
      `/api/movies/8/reviews?page=${currentPage - 1}`
    );

    const content = response.data.content.map((review) => {
      review.open = false;
      return review;
    });

    const index = content.findIndex((review) => review.id === reviewId);

    if (content[index] !== undefined) content[index].open = true;

    setReviews(content);
  };

  const saveHandlerClick = async (reviewId) => {
    try {
      const response = await axios.get(
        `/api/movies/8/reviews?page=${currentPage - 1}`
      );
      const content = response.data.content;
      const index = reviews.findIndex((review) => review.id === reviewId);

      if (reviews[index] !== undefined) reviews[index].open = false;

      setReviews(content);

      const review = {
        title: reviews[index].title,
        message: reviews[index].message,
      };
      setReviews(reviews);

      await axios({
        method: "put",
        url: `/api/movies/8/reviews/${reviews[index].id}`,
        data: review,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const editHandler = async (event, reviewId, field) => {
    reviews.map((review) => {
      if (review.id === reviewId) {
        review[field] = event.target.value;
        setReviews(reviews);
        setFormControls(event.target.value);

        if (review[field] === "") {
          console.log(field);
        }
      }
      return review;
    });
  };

  const editHandlerInputReview = (event, reviewId) => {
    editHandler(event, reviewId, "title");
  };

  const editHandlerTextareaReview = (event, reviewId) => {
    editHandler(event, reviewId, "message");
  };

  return (
    <div id="ReviewSection">
      <div className="reviewTitle">
        Отзывы на фильм Другая земля/Another Earth
      </div>
      <hr className="reviewLine" />

      {!reviewButtonActive ? (
        <Button type="success" onClick={() => setDropdawn(!dropdown)}>
          Оставить свой отзыв{" "}
          <span className={dropdown ? "down" : "up"}>➤</span>
        </Button>
      ) : (
        ""
      )}

      <div className="dropDawnWrapper">
        <DropdownForm
          dropdown={dropdown}
          setDropdawn={setDropdawn}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setReviews={setReviews}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          paginate={paginate}
          setReviewButtonActive={setReviewButtonActive}
        />
      </div>

      {totalPages !== 0 ? (
        <div className="reviews">
          <Review
            reviews={reviews}
            onRemoveClick={removeReview}
            onEditInputChange={editHandlerInputReview}
            onEditTextareaChange={editHandlerTextareaReview}
            onOpenClick={openHandlerClick}
            onSaveClick={saveHandlerClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      ) : (
        <div className="emptyReviews">Отзывов на этот фильм пока нет</div>
      )}
    </div>
  );
};

export default ReviewSection;
