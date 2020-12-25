import React from "react";
import Select from "../UiItem/Select/Select";
import selectStyle from "../UiItem/Select/selectStyle";
import ButtonsBlock from "../../pages/HomePage/AllFilms/Cards/ButtonsBlock/ButtonsBlock";
import FilmCard from "../../pages/HomePage/AllFilms/Cards/FilmCard";
import "./FilmCatalog.scss";

const FilmCatalog = () => {
  const options = [
    { value: "loved", label: "Любимые фильмы" },
    { value: "watchList", label: "Буду смотреть" },
    { value: "favourite", label: "Избранное" },
    { value: "bought", label: "Купленное" },
  ];

  return (
    <main className="filmCatalog">
      <div className="selectWrapper">
        <div className="category">Категории:</div>
        <Select
          isMulti={false}
          isSearchable={false}
          options={options}
          defaultValue={options[0]}
          onChange={(event) => {
            // props.setCurrentPage(1);
            // props.paginate(1, event, props.arrowDirection);
            // props.setFetch(true);
            // props.setLoading(true);
          }}
          noOptionsMessage={() => "Список пуст"}
          styles={selectStyle(
            272,
            15,
            "#fceddcd8",
            "#995506",
            "#995506",
            20,
            "#995506",
            "#b3752f81",
            "#4d0477b9",
            270,
            "#4d0477b9",
            15,
            4,
            "85%",
            3.35,
            "solid",
            "#b3752f81",
            "#4d0477b9",
            "#b3752f81",
            "#4d0477b9",
            "#b3752f81",
            17,
            230,
            "relative",
            -2,
            "pointer",
            "12%",
            -8,
            "hidden"
          )}
        />
      </div>
      <div className="CardWrapper myFilms">
        <FilmCard
          filmId={"film.id"}
          rusTitle={"film.rusTitle"}
          engTitle={"film.engTitle"}
          poster={"film.poster"}
          price={"film.price"}
          time={"film.time"}
          genres={"film.genres"}
          year={"film.year"}
          directors={"film.directors"}
          rating={10}
          backgroundColor={"film.pageColor1"}
        />
        <ButtonsBlock label={"Удалить"} price={200} />
      </div>
    </main>
  );
};

export default FilmCatalog;
