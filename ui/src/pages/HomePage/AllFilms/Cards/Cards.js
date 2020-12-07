import React from "react";
import { Link } from "react-router-dom";
import selectStyle from "../../../../components/UiItem/Select/selectStyle";
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
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="contentCard">
            <div className="topOfCardContent">
              <div className="year">{props.year}г.</div>
              <div className="rating">{props.rating.toFixed(1)}</div>
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
            backgroundImage: `linear-gradient(rgba(255, 255, 255, .1), rgba(0, 0, 0, 0.5))`,
            backgroundColor: props.backgroundColor,
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
          placeholder="Выберите категорию"
          noOptionsMessage={() => "Список пуст"}
          styles={selectStyle(
            230,
            15,
            "#c76c04",
            "#fff",
            "#fff",
            16,
            "#fff",
            "#fff",
            "rgb(252, 237, 220)",
            198,
            "rgb(252, 237, 220)",
            17
          )}
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
