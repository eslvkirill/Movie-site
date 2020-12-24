import React, { useState } from "react";
import FilmCard from "./FilmCard";
import BottomBlock from "./BottomBlock";
import Backdrop from "../../../../components/UiItem/Backdrop/Backdrop";
import "./Cards.scss";

const Cards = (props) => {
  const [authForm, setAuthForm] = useState(false);

  return (
    <div className="CardWrapper">
      <FilmCard
        filmId={props.filmId}
        poster={props.poster}
        year={props.year}
        rating={props.rating}
        engTitle={props.engTitle}
        rusTitle={props.rusTitle}
        backgroundColor={props.backgroundColor}
        genres={props.genres}
        time={props.time}
        directors={props.directors}
      />
      {authForm ? (
        <Backdrop authForm={authForm} setAuthForm={setAuthForm} />
      ) : null}
      <BottomBlock
        price={props.price}
        // label={"Добавить фильм"}
        setAuthForm={setAuthForm}
        user={props.user}
        filmId={props.filmId}
        operation={props.operation}
        film={props.film}
      />
    </div>
  );
};
export default Cards;
