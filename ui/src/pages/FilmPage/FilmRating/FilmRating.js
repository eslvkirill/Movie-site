import React from "react";
import axios from "axios";
import { Rating } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import "./FilmRating.scss";

const FilmRating = (props) => {
  const rating = props.userRating;

  const StyledRating = withStyles({
    icon: {
      color: rating !== 0 ? "#fff4e8c9" : "#fff4e894",
      transition: "0.25s",
      fontSize: 38,
    },
    iconFilled: {
      color: "#ffbb00",
    },
    iconHover: {
      color: "#ffd000",
    },
  })(Rating);

  const ratingHandler = (method) => async (newValue) => {
    try {
      const response = await axios[method](
        `/api/movies/${props.filmId}/ratings`,
        method !== "delete" ? { value: newValue } : null
      );

      if (method === "delete") props.setUserRating(null);
      else props.setUserRating(newValue);

      props.setTotalRating(response.data.totalRating);
      props.setNumberOfRatings(response.data.numberOfRatings);
    } catch (e) {
      console.log(e);
    }
  };

  const addRatingHandler = ratingHandler("post");
  const editRatingHandler = ratingHandler("put");
  const removieRatingHandler = ratingHandler("delete");

  return (
    <div className="filmRating">
      <StyledRating
        className="styledRating"
        name="customized-color half-rating "
        size="large"
        max={10}
        precision={0.5}
        value={rating === null ? rating : rating}
        onChange={(event, newValue) => {
          if (props.user !== null) {
            if (newValue) {
              props.setUserRating(newValue);
              if (rating !== null) editRatingHandler(newValue);
              if (rating === null) addRatingHandler(newValue);
            }
            props.setAuthForm(false);
          } else props.setAuthForm(true);
        }}
        style={rating === null ? { order: 2 } : {}}
      />
      <div
        className="ratingSection"
        style={
          rating === null
            ? { marginRight: "0.4rem", order: 1, width: "auto" }
            : {}
        }
      >
        <div
          className="removeRating"
          title={rating === null ? "" : "Удалить оценку"}
          style={
            rating === null
              ? {
                  cursor: "default",
                  fontSize: "1.5rem",
                  textShadow:
                    "0px 2px 1px #9b4724, 0px 2px 3px #9b4724, 0px 1px 3px #9b4724",
                  margin: "-0.3rem 0 0 -0.6rem",
                }
              : {}
          }
          onClick={() => {
            if (rating !== null) removieRatingHandler();
          }}
        >
          {rating !== null ? "✖" : "Оценить ➤"}
        </div>
        {props.user !== null ? (
          <div
            className="rating"
            title={`Ваша оценка: ${rating}`}
            style={rating === null ? { width: 0, border: "none" } : {}}
          >
            {rating !== null ? rating : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FilmRating;
