import React from "react";
import Input from "../../UiItem/Input/Input";
import Button from "../../UiItem/Button/Button";
import "./GenreItem.scss";

const GenreItem = (props) => (
  <ul className="GenreItem">
    {props.genres.map((genre, index) => {
      return (
        <li key={index}>
          <Input
            id={genre.id}
            value={genre.name}
            onChange={(event) => props.onChangeHandler(event, genre.id)}
            disabled={!genre.open}
            // autocomplete="off"
          />

          <Button
            id={genre.id}
            onClick={() => {
              !genre.open ? props.Click(genre.id) : props.Click2(genre.id);
            }}
            disabled={props.disabled}
          >
            {!genre.open ? "Редактировать" : "Сохранить"}
          </Button>
        </li>
      );
    })}
  </ul>
);

export default GenreItem;
