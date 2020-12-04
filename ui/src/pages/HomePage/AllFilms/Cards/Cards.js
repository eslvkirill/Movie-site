import React from "react";
import { Link } from "react-router-dom";
import Select from "../../../../components/UiItem/Select/Select";
import Button from "../../../../components/UiItem/Button/Button";
import BackItem from "./BackItem/BackItem";
import "./Cards.scss";

const Cards = (props) => (
  <div className="CardWrapper">
    <div className="Cards">
      <Link to={`/api/movies/${props.filmId}`}>
        <div
          className="FrontSide"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)), 
          url("data:image/*;base64,${props.poster}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="contentCard">
            <div className="topOfCardContent">
              <div className="year">{props.year}г.</div>
              <div className="rating">{props.rating}</div>
            </div>
            <div className="titles">
              <div className="engTitle">{props.engTitle}</div>
              <div className="rusTitle">{props.rusTitle}</div>
            </div>
            <i>Наведите на фото</i>
          </div>
        </div>
        <div
          className="BackSide"
          style={{
            background: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, 0.5)), ${props.backgroundColor}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <BackItem
            rusTitle={props.rusTitle}
            engTitle={props.engTitle}
            genres={props.genres}
            time={props.time}
            directors={props.directors}
          />
        </div>
      </Link>
    </div>
    <div className="bottomOfCard">
      <div className="categoryList">
        <div className="addLabel">Добавить в:</div>
        <Select
          type="normal"
          placeholder="Выберите категорию"
          noOptionsMessage={() => "Список пуст"}
        />
      </div>
      <div className="buttonsWrapper">
        <Button type="success onAdd">Добавить фильм</Button>
        <Button type="success onBuy">
          Купить за <span>{props.price}</span>р
        </Button>
      </div>
    </div>
  </div>
);

export default Cards;
