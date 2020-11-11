import React from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";
import {
  faKickstarterK,
  faImdb,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import "./FilmPage.scss";

const FilmPage = ({ page }) => (
  <div className="FilmPage">
    <section className="FirstSection">
      <div className="Wrapper">
        <div className="Genres">комедия/приключение, детектив/криминал</div>
        <div className="Title">
          The Grand Budapest Hotel
          <span>&nbsp;Отель «Гранд Будапешт»</span>
          <span className="Year">2014</span>
        </div>
        <div className="Time">1ч 40м</div>
        <br />
        <div className="Description">
          Фильм рассказывает об увлекательных приключениях легендарного
          консьержа Густава и его юного друга, портье Зеро Мустафы. Сотрудники
          гостиницы становятся свидетелями кражи и поисков бесценных картин
          эпохи Возрождения, борьбы за огромное состояние богатой семьи и…
          драматических изменений в Европе между двумя кровопролитными войнами
          XX века.
        </div>
        <div className="Cast">
          Режиссёр: <span>Уэс Андерсон</span>
          <br />В главных ролях:{" "}
          <span>
            Рэйф Файнс, Тони Револори, Сирша Ронан, Эдриан Броуди, Уиллем Дефо,
            Эдвард Нортон, Матьё Амальрик, Джуд Лоу, Ф. Мюррэй Абрахам, Тильда
            Суинтон, Джефф Голдблюм
          </span>
        </div>
        <div className="BottomOfSection">
          <a href="#trailer" className="TrailerButton">
            Посмотреть трейлер
          </a>
          <div className="ByButton">
            <a
              // target="_blank"
              href="https://kinozal-tv.appspot.com/details.php?sid=le9mVLyk&id=1220921"
            >
              <span />
              <span />
              <span />
              <span />
              Купить за 200р
            </a>
          </div>
        </div>
      </div>
    </section>
    <section className="SecondSection">
      <div className="Block">
        <div className="LeftSide">
          <div id="trailer" className="Trailer">
            Official Trailer
          </div>
          <div className="VideoContainer">
            <div className="Video">
              <iframe
                title="Movie Trailer"
                width="710"
                height="445"
                src="https://www.youtube.com/embed/OUw5JaaGNQc?"
                controls="0"
                frameBorder="0px"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="Oscars">
            <img
              src={require("../../images/awardOscar.png")}
              alt="Оскаровская статуэтка"
            />
            <img
              src={require("../../images/awardOscar.png")}
              alt="Оскаровская статуэтка"
            />
            <img
              src={require("../../images/awardOscar.png")}
              alt="Оскаровская статуэтка"
            />
          </div>
        </div>
      </div>
      <div className="Block">
        <div className="RightSide">
          <div className="Title">The Grand Budapest Hotel</div>
          <br />
          <div className="Tagline">
            &lt;&lt;Убийство, месть, любовь и приключения. И все это - на фоне
            отеля "Гранд Будапешт". И еще там бегут из тюрьмы!&gt;&gt;
          </div>
          <div className="RatingsWrapper">
            <div className="RatingsContainer">
              <div className="KinopoiskStars">
                <div className="Rating">Kinopoisk 7.9</div>
                <div className="StarsWrapper">
                  <div className="Star">
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                  </div>
                </div>
              </div>
              <div className="IMDbStars">
                <div className="Rating">IMDb 8.1</div>
                <div className="StarsWrapper">
                  <div className="Star">
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                  </div>
                </div>
              </div>

              <div className="RottentomatoesStars">
                <div className="Rating">Rottentomatoes 8.6</div>
                <div className="StarsWrapper">
                  <div className="Star">
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                  </div>
                </div>
              </div>
              <div className="MetacriticStars">
                <div className="Rating">Metacritic 8.9</div>
                <div className="StarsWrapper">
                  <div className="Star">
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                    <img src={require("../../images/star.png")} alt="Звезда" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={classes.SiteStars}>
              <div className={classes.Rating}>Film*s.ru 10/10</div>
              <div className={classes.SiteStarsWrapper}>
                <div className={classes.Star}>
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                  <img src={require("../../images/star.png")} alt="Звезда" />
                </div>
              </div>
            </div> */}

            <ul className="Icons">
              <li>
                <a
                  // target="_blank"
                  href="https://www.kinopoisk.ru/film/683999/"
                  className="Kinopoisk"
                >
                  <div className="Front">
                    <FontAwesomeIcon
                      icon={faKickstarterK}
                      title="www.kinopoisk.ru"
                    />
                  </div>
                  <div className="Back">
                    <FontAwesomeIcon
                      icon={faKickstarterK}
                      title="www.kinopoisk.ru"
                    />
                  </div>
                </a>
              </li>
              <li>
                <a
                  // target="_blank"
                  href="https://www.imdb.com/title/tt2278388/"
                  className="Imdb"
                >
                  <div className="Front">
                    <FontAwesomeIcon icon={faImdb} title="www.imdb.com" />
                  </div>
                  <div className="Back">
                    <FontAwesomeIcon icon={faImdb} title="www.imdb.com" />
                  </div>
                </a>
              </li>

              <li>
                <a
                  // target="_blank"
                  href="https://www.rottentomatoes.com/m/the_grand_budapest_hotel_2014"
                  className="Rottentomatoes"
                >
                  <div className="Front">
                    <FontAwesomeIcon
                      icon={faRegistered}
                      title="www.rottentomatoes.com"
                    />
                  </div>
                  <div className="Back">
                    <FontAwesomeIcon
                      icon={faRegistered}
                      title="www.rottentomatoes.com"
                    />
                  </div>
                </a>
              </li>
              <li>
                <a
                  // target="_blank"
                  href="https://www.metacritic.com/movie/the-grand-budapest-hotel"
                  className="Metacritic"
                >
                  <div className="Front">
                    <FontAwesomeIcon
                      icon={faMediumM}
                      title="www.metacritic.com"
                    />
                  </div>
                  <div className="Back">
                    <FontAwesomeIcon
                      icon={faMediumM}
                      title="www.metacritic.com"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FilmPage;
