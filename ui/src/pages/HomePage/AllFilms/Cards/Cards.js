import React from "react";
import FilmCard from "./FilmCard";
import BottomBlock from "./BottomBlock";
import "./Cards.scss";

const Cards = (props) => (
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
    <BottomBlock price={props.price} label={"Добавить фильм"} />
  </div>
);

export default Cards;
