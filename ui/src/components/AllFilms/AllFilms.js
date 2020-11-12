import React from "react";
import Cards from "./Cards/Cards";
import "./AllFilms.scss";

const AllFilms = ({ page }) => (
  <div className="AllFilms">
    <section>
      <p>Фильмы</p>
      <ul>
        {/* {this.state.cards.map((card, index) => {
          return ( */}
        <li>
          <Cards
            frontTitle="Отель Гранд Будапешт"
            frontLayer="Фон"
            films="engBackTitle: string; rusBackTitle: string"
          />
          <Cards
            frontTitle="Отель Гранд Будапешт"
            frontLayer="Фон"
            films="engBackTitle: string; rusBackTitle: string"
          />
          <Cards
            frontTitle="Отель Гранд Будапешт"
            frontLayer="Фон"
            films="engBackTitle: string; rusBackTitle: string"
          />
          <Cards
            frontTitle="Отель Гранд Будапешт"
            frontLayer="Фон"
            films="engBackTitle: string; rusBackTitle: string"
          />
          <Cards
            frontTitle="Отель Гранд Будапешт"
            frontLayer="Фон"
            films="engBackTitle: string; rusBackTitle: string"
          />
        </li>
        {/* );
        })} */}
      </ul>
    </section>
  </div>
);

export default AllFilms;
