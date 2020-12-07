import React from "react";
import Button from "../../../components/UiItem/Button/Button";
import ContentLoader from "../../../components/UiItem/Loaders/ContentLoader/ContentLoader";
import PaginateLoader from "../../../components/UiItem/Loaders/ButtonsLoader/PaginateLoader/PaginateLoader";
import Cards from "./Cards/Cards";
import "./AllFilms.scss";

const AllFilms = (props) => {
  const renderOnLoadButton = () => {
    if (!props.activeButton && !props.isFetch) {
      return (
        <Button
          type="success onLoad"
          onClick={() => {
            props.paginate(
              props.currentPage,
              props.sortValue,
              props.arrowDirection
            );
            props.setFetch(true);
          }}
        >
          Загрузить ещё
        </Button>
      );
    } else if (props.isFetch) return <PaginateLoader />;
  };

  return (
    <section className="AllFilms">
      {props.loading ? (
        <ContentLoader className="Loader" />
      ) : (
        <ul>
          {props.films.map((film, index) => {
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
                  rating={film.totalRating}
                  backgroundColor={film.pageColor1}
                />
              </li>
            );
          })}
          {props.films.length !== 0 ? (
            <div className="buttonSection">
              <p>
                Вы просмотрели{" "}
                {!props.activeButton
                  ? `${props.numberOfElements} из ${props.totalElements} фильмов`
                  : "все фильмы"}
              </p>
              <progress
                value={props.numberOfElements}
                max={props.totalElements}
              ></progress>
              {renderOnLoadButton()}
            </div>
          ) : (
            <div className="emptyFilms">Ничего не найдено</div>
          )}
        </ul>
      )}
    </section>
  );
};

export default AllFilms;
