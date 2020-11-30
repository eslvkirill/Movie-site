import React from "react";
import AllFilms from "../../components/AllFilms/AllFilms";
import "./HomePage.scss";

const HomePage = () => (
  <main className="HomePage">
    <div className="DescriptionWrapper">
      <hr className="FirstLine" />
      <div className="Description">
        Хотите посмотреть хороший фильм, но не знаете, какой выбрать? На данной
        странице собраны одни из лучших фильмов по различным жанрам, Вы сможете
        выбрать именно ту кинокартину, которая Вам действительно понравится и
        запомнится надолго.
      </div>
      <hr className="SecondLine" />
    </div>

    <AllFilms />
  </main>
);

export default HomePage;
