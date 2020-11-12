import React from "react";
import BackItemList from "./BackItemList/BackItemList";
import "./Cards.scss";

const Cards = (props) => (
  <div className="Cards">
    <div
      className="FrontSide"
      style={{
        background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7))`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <span>
        <h1>топ 5 {props.frontTitle.toUpperCase()}</h1>
        <br />
        <br />
        <a href="##">Наведите на фото</a>
      </span>
    </div>
    <div
      className="BackSide"
      style={{
        background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7))`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <BackItemList films={props.films} />
    </div>
  </div>
);

export default Cards;
