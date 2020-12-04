import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../UiItem/Button/Button";
import ContentLoader from "../UiItem/Loaders/ContentLoader/ContentLoader";
import ButtonLoader from "../UiItem/Loaders/ButtonLoader/ButtonLoader";
import Cards from "./Cards/Cards";
import "./AllFilms.scss";

const AllFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(true);
  const [isFetch, setFetch] = useState(true);

  const paginate = async (pageNumber) => {
    await axios.get(`/api/movies?page=${pageNumber - 1}`).then((response) => {
      const newFilms = response.data.content;

      newFilms.map((film) => {
        Object.keys(film).map((name) => {
          if (Array.isArray(film[name]) && film[name] !== "poster") {
            film[name] = film[name].map((value) => value.name).join(", ");
          }
          if (name === "time") {
            film[name] = `${film[name].hour}ч ${film[name].minute}м`;
          }
          return film[name];
        });
        return film;
      });

      if (response.data.last === false) setActiveButton(false);
      else setActiveButton(true);

      setNumberOfElements(
        (prevNumber) => prevNumber + response.data.numberOfElements
      );
      setCurrentPage(() => currentPage + 1);
      setFilms((films) => [...films, ...newFilms]);
      setLoading(false);
      setFetch(false);
    });
  };

  useEffect(() => {
    paginate(currentPage);
    // eslint-disable-next-line
  }, []);

  const renderOnLoadButton = () => {
    if (!activeButton && !isFetch) {
      return (
        <Button
          type="success onLoad"
          onClick={() => {
            paginate(currentPage);
            setFetch(true);
          }}
        >
          Загрузить ещё
        </Button>
      );
    } else if (isFetch) {
      return <ButtonLoader />;
    }
  };

  return (
    <div className="AllFilms">
      {loading ? (
        <ContentLoader className="Loader" />
      ) : (
        <ul>
          {films.map((film, index) => {
            return (
              <li key={index}>
                <Cards
                  filmId={film.id}
                  rusTitle={film.rusTitle}
                  engTitle={film.engTitle}
                  poster={film.poster}
                  price={film.price}
                  time={film.time}
                  genres={film.genres}
                  year={film.year}
                  directors={film.directors}
                />
              </li>
            );
          })}
          <div className="buttonSection">
            <p>
              Вы просмотрели{" "}
              {!activeButton
                ? `${numberOfElements} из 4 фильмов`
                : "все фильмы"}
            </p>
            <progress value={numberOfElements} max="4"></progress>
            {renderOnLoadButton()}
          </div>
        </ul>
      )}
    </div>
  );
};

export default AllFilms;
