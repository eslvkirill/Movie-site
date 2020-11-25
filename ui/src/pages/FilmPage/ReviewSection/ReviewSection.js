import React, { useState } from "react";
import Button from "../../../components/UiItem/Button/Button";
import DropdownForm from "./DropdownForm/DropdownForm";
import Review from "./Review/Review";
import Pagination from "./Pagination/Pagination";
import "./ReviewSection.scss";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Василий",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 2,
      name: "Евгений",
      date: "24 окт. 2020 г., 12:15:22",
      title: "Сильная драма",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laboriosam, exercitationem expedita quo modi temporibus, necessitatibus, saepe aperiam tempore consequatur labore incidunt minus possimus animi laborum!",
    },
    {
      id: 3,
      name: "Игорь",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 4,
      name: "Кирилл",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 5,
      name: "Кирилл",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 6,
      name: "Кирилл",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 7,
      name: "Василий",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 8,
      name: "Евгений",
      date: "24 окт. 2020 г., 12:15:22",
      title: "Сильная драма",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laboriosam, exercitationem expedita quo modi temporibus, necessitatibus, saepe aperiam tempore consequatur labore incidunt minus possimus animi laborum!",
    },
    {
      id: 9,
      name: "Игорь",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
    {
      id: 10,
      name: "Игорь",
      date: "21 окт. 2020 г., 16:03:54",
      title: "Крутой фильм",
      text:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, distinctio laboriosam aperiam repellendus rem neque accusantium! Nobis suscipit quibusdam nemo vero labore quos tempora explicabo magnam pariatur iusto, sit ad.",
    },
  ]);

  const [dropdown, setDropdawn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(3);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const removeReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  return (
    <div id="ReviewSection">
      <div className="reviewTitle">
        Отзывы на фильм Другая земля/Another Earth
      </div>
      <hr className="reviewLine" />

      <Button type="success" onClick={() => setDropdawn(!dropdown)}>
        Оставить свой отзыв <span className={dropdown ? "down" : "up"}>➤</span>
      </Button>

      {dropdown ? (
        <div className="dropDawnWrapper">
          <DropdownForm
            dropdown={dropdown}
            reviews={reviews}
            setReviews={setReviews}
          />
        </div>
      ) : (
        ""
      )}

      {reviews.length > 0 ? (
        <div className="reviews">
          <Review
            reviews={currentReviews}
            onRemoveClick={removeReview}
            // onChangeClick={editReview}
          />
          <Pagination
            reviewsPerPage={reviewsPerPage}
            totalReviews={reviews.length}
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
