import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKickstarterK,
  faImdb,
  faMediumM,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-scroll";
import ReviewSection from "./ReviewSection/ReviewSection";
import FilmRating from "./FilmRating/FilmRating";
import ContentLoader from "../../components/UiItem/Loaders/ContentLoader/ContentLoader";
import { useUserAuth } from "../../containers/UserContext/UserContext";
import Backdrop from "../../components/UiItem/Backdrop/Backdrop";
import "./FilmPage.scss";

export default function FilmPage(props) {
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [reviewButtonActive, setReviewButtonActive] = useState(false);
  const [user] = useUserAuth();
  const [authForm, setAuthForm] = useState(false);
  const [cartButton, setCartButton] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        await axios
          .get(`/api/movies/${props.match.params.id}`)
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
                  .map((value) =>
                    name === "genres" ||
                    name === "actors" ||
                    name === "directors"
                      ? value.name
                      : value
                  )
                  .join(", ");
                if (name === "actors" || name === "directors")
                  film[name] = film[name].split(", ").sort().join(", ");
              }
              if (name === "time")
                film[name] = `${film[name].hour}ч ${film[name].minute}м`;
              if (name === "userRating" && film[name] !== null)
                film[name] = film[name].value;

              return film[name];
            });

            setFilm(film);
            setUserRating(film.userRating);
            setTotalRating(film.totalRating);
            setNumberOfRatings(film.numberOfRatings);
            setReviewButtonActive(film.userHasAlreadyWrittenReview);
            setLoading(false);
            setCartButton(
              film.operation === "ADD"
                ? false
                : film.operation === "REMOVE"
                ? true
                : null
            );
          });
      } catch (e) {
        console.log(e);
      }
    };
    getMovie();
  }, [props.match.params.id]);

  const backgroundStyle = (picture) => {
    let style = {};
    if (film[picture]) {
      style = {
        backgroundImage: `linear-gradient(rgba(250, 250, 250, 0.1), rgba(0, 0, 0, 0.7)), 
          url("data:image/*;base64,${film[picture]}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      };
    }
    return style;
  };

  const renderIcons = () =>
    film.sourceData.map((data, index) => {
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

  const renderImages = (value, src, alt) => {
    let images = [];
    for (let i = 0; i < Math.round(value); i++) {
      images.push(
        <img key={i} src={require(`../../images/${src}`)} alt={alt} />
      );
    }
    return images;
  };

  const renderRatings = () =>
    film.sourceData.map((data, index) => (
      <div key={index} className={`${data.name}Stars`}>
        <div className="Rating">
          {data.name} {data.rating}
        </div>
        <div className="StarsWrapper">
          <div className="Star">
            {renderImages(data.rating, "star.png", "Звезда рейтинга")}
          </div>
        </div>
      </div>
    ));

  const renderOscars = () =>
    renderImages(film.oscars, "awardOscar.png", "Оскаровская статуэтка");

  const addToCart = async () => {
    try {
      await axios({
        method: "post",
        contentType: "application/json",
        url: `/api/users/cart/${film.id}`,
        data: film.id,
      });
      setCartButton(!cartButton);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFromCart = async () => {
    try {
      await axios.delete(`/api/users/cart/${film.id}`);
      setCartButton(!cartButton);
    } catch (e) {
      console.log(e);
    }
  };

  const renderBuyButton = () => {
    if (user !== null) {
      return (
        <div
          className="BuyButton"
          onClick={() =>
            film.operation !== "WATCH" &&
            ((film.operation === "ADD" && !cartButton) ||
              (film.operation === "REMOVE" && !cartButton))
              ? addToCart()
              : film.operation !== "WATCH" &&
                (film.operation === "REMOVE" || cartButton)
              ? deleteFromCart()
              : null
          }
        >
          {/* <a
          // target="_blank"
          href="https://kinozal-tv.appspot.com/details.php?sid=le9mVLyk&id=1220921"
        > */}
          <div className={film.operation === "WATCH" ? "filmWatch" : ""}>
            <span />
            <span />
            <span />
            <span />
            {film.operation === "WATCH" && user !== null ? (
              <span>Фильм куплен</span>
            ) : (film.operation === "ADD" &&
                !cartButton &&
                film.operation !== "WATCH") ||
              !cartButton ? (
              <>
                Купить за{" "}
                <span className="Price">
                  {price}
                  <span>р</span>
                </span>
              </>
            ) : (film.operation === "REMOVE" || cartButton) &&
              film.operation !== "WATCH" ? (
              "Убрать из корзины"
            ) : null}
          </div>
          {/* </a> */}
        </div>
      );
    }
  };

  const {
    genres,
    engTitle,
    rusTitle,
    ageRating,
    year,
    time,
    plot,
    actors,
    directors,
    countries,
    audio,
    subtitles,
    price,
    pageColor1,
    pageColor2,
    trailerUrl,
    tagline,
    reviews,
  } = film;

  return (
    <div
      className="FilmPage"
      // style={authForm ? { position: "absolute" } : {}}
    >
      {loading ? (
        <ContentLoader className="Loader" />
      ) : (
        <>
          <section
            className="FirstSection"
            style={backgroundStyle("background")}
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
              {authForm ? (
                <Backdrop authForm={authForm} setAuthForm={setAuthForm} />
              ) : null}
              <FilmRating
                user={user}
                setAuthForm={setAuthForm}
                filmId={props.match.params.id}
                userRating={userRating}
                setUserRating={setUserRating}
                setTotalRating={setTotalRating}
                totalRating={props.totalRating}
                setNumberOfRatings={setNumberOfRatings}
              />
              <div className="Time">{time}</div>
              <div className="Plot">{plot}</div>
              <div className="AfterPlotBlock">
                <div className="Cast">
                  Режиссёр: <span className="People">{directors}</span>
                  <br />В главных ролях:{" "}
                  <span className="People">{actors}</span>
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
                  <Link
                    className="TrailerButton"
                    activeClass="active"
                    to="trailer"
                    spy={true}
                    smooth={true}
                    hashSpy={true}
                    offset={0}
                    duration={900}
                    isDynamic={true}
                  >
                    Посмотреть трейлер
                  </Link>
                  <Link
                    className="TrailerButton ReviewButton"
                    activeClass="active"
                    to="ReviewSection"
                    spy={true}
                    smooth={true}
                    hashSpy={true}
                    offset={0}
                    duration={900}
                    isDynamic={true}
                  >
                    Прочитать отзывы
                  </Link>
                </div>
                {renderBuyButton()}
              </div>
            </div>
            <div className="totalRatingBlock">
              <div className="totalRating" title="Общий рейтинг">
                {totalRating.toFixed(2)}
              </div>
              <div className="numberOfRatings" title="Количество пользователей">
                {numberOfRatings} оценок
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
                <div className="Oscars">{renderOscars()}</div>
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
                  <div className="RatingsContainer">{renderRatings()}</div>
                  <ul className="Icons">{renderIcons()}</ul>
                </div>
              </div>
            </div>
          </section>
          <ReviewSection
            filmId={props.match.params.id}
            user={user}
            reviews={reviews}
            rusTitle={rusTitle}
            engTitle={engTitle}
            pageColor1={pageColor1}
            pageColor2={pageColor2}
            reviewButtonActive={reviewButtonActive}
            setReviewButtonActive={setReviewButtonActive}
          />
        </>
      )}
    </div>
  );
}
