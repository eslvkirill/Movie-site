import React from "react";
import { CSSTransition } from "react-transition-group";
import Input from "../../../UiItem/Input/Input";
import Button from "../../../UiItem/Button/Button";
import "./GenreItem.scss";

const GenreItem = (props) => (
  <CSSTransition
    in={props.dropdown}
    appear={true}
    exit={true}
    unmountOnExit={true}
    classNames="fade"
    timeout={{
      enter: 300,
      exit: 200,
    }}
  >
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
  </CSSTransition>
);

export default GenreItem;
