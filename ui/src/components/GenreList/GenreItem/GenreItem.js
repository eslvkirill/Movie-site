import React from "react";
import classes from "./GenreItem.module.scss";
import Button from "../../UiItem/Button/Button";

const GenreItem = (props) => (
  <ul className={classes.GenreItem}>
    {props.genres.map((genre, index) => {
      return (
        <li key={index}>
          <div id={genre.id}>{genre.name}</div>
          <Button>Редактировать</Button>
        </li>
      );
    })}
  </ul>
);

export default GenreItem;
