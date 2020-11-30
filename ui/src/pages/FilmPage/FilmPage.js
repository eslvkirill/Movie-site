import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKickstarterK,
  faImdb,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import ReviewSection from "./ReviewSection/ReviewSection";
import ContentLoader from "../../components/UiItem/Loaders/ContentLoader/ContentLoader";
import "./FilmPage.scss";

export default class FilmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: {},
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      await axios
        .get(`/api/movies/${this.props.match.params.id}`)
        .then((response) => {
          console.log(response.data);
          const film = response.data;
          let sourceData = film.sourceData;

          sourceData.map((data) => {
            const name = data.url.split(".")[1];
            data.name = name.charAt(0).toUpperCase() + name.slice(1);
            if (data.name === "Metacritic") data.rating /= 10;
            return data;
          });

          const sortSourceData = (sourceData) => {
            sourceData.sort((present, next) =>
              present.name > next.name ? 1 : -1
            );
            [sourceData[0], sourceData[1]] = [sourceData[1], sourceData[0]];
          };

          sortSourceData(sourceData);

          Object.keys(film).map((name) => {
            if (Array.isArray(film[name]) && name !== "sourceData") {
              film[name] = film[name]
                .map((value) => (name === "genres" ? value.name : value))
                .join(", ");
            }
            if (name === "time") {
              film[name] = `${film[name].hour}ч ${film[name].minute}м`;
            }
            return film[name];
          });

          this.setState({ film, loading: false });
        });
    } catch (e) {
      console.log(e);
    }
  }

  backgroundStyle = (picture) => {
    let style = {};
    if (this.state.film[picture]) {
      style = {
        backgroundImage: `linear-gradient(rgba(250, 250, 250, 0.1), rgba(0, 0, 0, 0.7)), 
          url("data:image/*;base64,${this.state.film[picture]}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      };
    }
    return style;
  };

  renderIcons = () =>
    this.state.film.sourceData.map((data, index) => {
      const icon =
        data.name === "Metacritic"
          ? faMediumM
          : data.name === "Kinopoisk"
          ? faKickstarterK
          : data.name === "Imdb"
          ? faImdb
          : null;

      return (
        <li key={index}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data.url}
            className={data.name}
          >
            <div className="Front">
              <FontAwesomeIcon icon={icon} title={data.url} />
            </div>
            <div className="Back">
              <FontAwesomeIcon icon={icon} title={data.url} />
            </div>
          </a>
        </li>
      );
    });

  renderImages = (value, src, alt) => {
    let images = [];
    for (let i = 0; i < Math.round(value); i++) {
      images.push(
        <img key={i} src={require(`../../images/${src}`)} alt={alt} />
      );
    }
    return images;
  };

  // {[...Array(10)].map((x, i) =>
  //   <ObjectRow key={i} />
  // )}

  renderRatings = () =>
    this.state.film.sourceData.map((data, index) => (
      <div key={index} className={`${data.name}Stars`}>
        <div className="Rating">
          {data.name} {data.rating}
        </div>
        <div className="StarsWrapper">
          <div className="Star">
            {this.renderImages(data.rating, "star.png", "Звезда рейтинга")}
          </div>
        </div>
      </div>
    ));

  renderOscars = () =>
    this.renderImages(
      this.state.film.oscars,
      "awardOscar.png",
      "Оскаровская статуэтка"
    );

  render() {
    const {
      genres,
      engTitle,
      rusTitle,
      ageRating,
      year,
      time,
      plot,
      countries,
      audio,
      subtitles,
      price,
      pageColor1,
      pageColor2,
      trailerUrl,
      tagline,
      reviews,
    } = this.state.film;

    const loading = this.state.loading;

    return (
      <div className="FilmPage">
        {loading ? (
          <ContentLoader className="Loader" />
        ) : (
          <>
            <section
              className="FirstSection"
              style={this.backgroundStyle("background")}
            >
              <div className="Wrapper">
                <div className="Genres">
                  <p>{genres}</p>
                </div>
                <div className="Title">
                  <p>
                    {" "}
                    {engTitle}
                    <span>&nbsp;{rusTitle}</span>
                  </p>
                  <div className="RightSideOfTitle">
                    <div className="AgeRating">
                      <span>{ageRating}</span>
                    </div>
                    <div className="Year">
                      {year}
                      <span> г.</span>
                    </div>
                  </div>
                </div>
                <div className="Time">{time}</div>
                <div className="Plot">{plot}</div>
                <div className="AfterPlotBlock">
                  <div className="Cast">
                    Режиссёр: <span className="People">Уэс Андерсон</span>
                    <br />В главных ролях:{" "}
                    <span className="People">
                      Рэйф Файнс, Тони Револори, Сирша Ронан, Эдриан Броуди,
                      Уиллем Дефо, Эдвард Нортон, Матьё Амальрик, Джуд Лоу, Ф.
                      Мюррэй Абрахам, Тильда Суинтон, Джефф Голдблюм
                    </span>
                  </div>
                  <div className="Details">
                    <div>
                      Страна: <span>{countries}</span>
                    </div>
                    <div>
                      Языки аудиодорожек: <span>{audio}</span>
                    </div>
                    <div>
                      Языки субтитров: <span>{subtitles}</span>
                    </div>
                  </div>
                </div>
                <div className="BottomOfSection">
                  <div className="Links">
                    <a href="#trailer" className="TrailerButton">
                      Посмотреть трейлер
                    </a>
                    <a
                      href="#ReviewSection"
                      className="TrailerButton ReviewButton"
                    >
                      Прочитать отзывы
                    </a>
                  </div>
                  <div className="BuyButton">
                    <a
                      // target="_blank"
                      href="https://kinozal-tv.appspot.com/details.php?sid=le9mVLyk&id=1220921"
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                      Купить за{" "}
                      <span className="Price">
                        {price}
                        <span>р</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="SecondSection"
              style={{
                width: "100vw",
                height: "105vh",
                background: `linear-gradient(105deg, ${pageColor1} 50%, ${pageColor2} 50%)`,
              }}
            >
              <div className="Block">
                <div className="LeftSide">
                  <div
                    id="trailer"
                    className="Trailer"
                    style={{ color: pageColor2 }}
                  >
                    Official Trailer
                  </div>
                  <div className="VideoContainer">
                    <div className="Video">
                      <iframe
                        title="Movie Trailer"
                        width="710"
                        height="445"
                        src={trailerUrl}
                        controls="0"
                        frameBorder="0px"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="Oscars">{this.renderOscars()}</div>
                </div>
              </div>
              <div className="Block">
                <div className="RightSide">
                  <div className="Title" style={{ color: pageColor1 }}>
                    {engTitle}
                  </div>
                  <br />
                  <div className="Tagline">&lt;&lt;{tagline}&gt;&gt;</div>
                  <div className="RatingsWrapper">
                    <div className="RatingsContainer">
                      {this.renderRatings()}
                    </div>
                    <ul className="Icons">{this.renderIcons()}</ul>
                  </div>
                </div>
              </div>
            </section>
            <ReviewSection
              filmId={this.props.match.params.id}
              reviews={reviews}
              rusTitle={rusTitle}
              engTitle={engTitle}
              pageColor1={pageColor1}
              pageColor2={pageColor2}
            />
          </>
        )}
      </div>
    );
  }
}
