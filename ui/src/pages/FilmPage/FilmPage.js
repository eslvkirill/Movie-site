import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKickstarterK,
  faImdb,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import ReviewSection from "./ReviewSection/ReviewSection";
import "./FilmPage.scss";

//FilmPage({ page })
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
      await axios.get("/api/movies/8").then((response) => {
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
        //удаляю Rottentomatoes
        sourceData.pop();

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

      console.log(this.state);
    } catch (e) {
      console.log(e);
    }
  }

  // async componentDidUpdate() {
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: "/api/movies/8",
  //       // contentType: "application/octet-stream",
  //       // responseType: "blob",
  //     });
  //     //.then((response) => this.setState({ film: response.data }));
  //     this.setState({ film: response.data });
  //     // .then((response) =>
  //     //   response.data
  //     //     .text()
  //     //     .then((text) => this.setState({ film: JSON.parse(text) }))
  //     // );

  //     console.log(this.state);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  backgroundStyle = (picture, color = "250, 250, 250, 0.1") => {
    let style = {};
    if (this.state.film[picture]) {
      style = {
        backgroundImage: `linear-gradient(rgba(${color}), rgba(0, 0, 0, 0.7)), 
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
    return (
      // const FilmPage = ({ page }) => (
      <div className="FilmPage">
        <section
          className="FirstSection"
          style={this.backgroundStyle("background1")}
        >
          <div className="Wrapper">
            <div className="Genres">
              <p>{this.state.film.genres}</p>
            </div>
            <div className="Title">
              <p>
                {" "}
                {this.state.film.engTitle
                  ? this.state.film.engTitle
                  : "Название фильма Название фильма"}
                <span>&nbsp;{this.state.film.rusTitle}</span>
              </p>
              <div className="RightSideOfTitle">
                <div className="AgeRating">
                  <span>{this.state.film.ageRating}</span>
                </div>
                <div className="Year">
                  {this.state.film.year}
                  <span> г.</span>
                </div>
              </div>
            </div>
            <div className="Time">{this.state.film.time}</div>
            <div className="Plot">{this.state.film.plot}</div>
            <div className="AfterPlotBlock">
              <div className="Cast">
                Режиссёр: <span className="People">Уэс Андерсон</span>
                <br />В главных ролях:{" "}
                <span className="People">
                  Рэйф Файнс, Тони Револори, Сирша Ронан, Эдриан Броуди, Уиллем
                  Дефо, Эдвард Нортон, Матьё Амальрик, Джуд Лоу, Ф. Мюррэй
                  Абрахам, Тильда Суинтон, Джефф Голдблюм
                </span>
              </div>
              <div className="Details">
                <div>
                  Страна: <span>{this.state.film.countries}</span>
                </div>
                <div>
                  Языки аудиодорожек: <span>{this.state.film.audio}</span>
                </div>
                <div>
                  Языки субтитров: <span>{this.state.film.subtitles}</span>
                </div>
              </div>
            </div>
            <div className="BottomOfSection">
              <div className="Links">
                <a href="#trailer" className="TrailerButton">
                  Посмотреть трейлер
                </a>
                <a href="#ReviewSection" className="TrailerButton ReviewButton">
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
                    {this.state.film.price}
                    <span>р</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {!this.state.loading ? (
          <>
            <section
              className="SecondSection"
              style={this.backgroundStyle("background2", "0, 0, 0, 0.2")}
              //           style={{
              //             width: "100vw",
              //             height: "100vh",
              //             background: `linear-gradient(
              //   105deg,

              //   #b6dbe0 50%, #0f687a 50%
              // )`,
              //          }}
            >
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
                        // src="https://www.youtube.com/embed/OUw5JaaGNQc?"
                        src={
                          this.state.film.trailerUrl
                            ? this.state.film.trailerUrl
                            : ""
                        }
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
                  <div className="Title">{this.state.film.engTitle}</div>
                  <br />
                  <div className="Tagline">
                    &lt;&lt;{this.state.film.tagline}&gt;&gt;
                  </div>
                  <div className="RatingsWrapper">
                    <div className="RatingsContainer">
                      {this.renderRatings()}
                    </div>
                    <ul className="Icons">{this.renderIcons()}</ul>
                  </div>
                </div>
              </div>
            </section>
            <ReviewSection />
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
// export default FilmPage;
