import React, { useState, useEffect } from "react";
import axios from "axios";
import { filmConstructor } from "../../exportFunctions/filmConstructor/filmConstructor";
import AllFilms from "./AllFilms/AllFilms";
import OperationsSection from "./OperationsSection/OperationsSection";
import "./HomePage.scss";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(true);
  const [isFetch, setFetch] = useState(true);

  const [arrowDirection, setArrowDirection] = useState(true);
  const [sortValue, setSortValue] = useState();
  const [filterContent, setFilterContent] = useState({});

  const options = [
    { value: "id", label: "Умолчанию" },
    { value: "rusTitle", label: "Русскому названию" },
    { value: "engTitle", label: "Оригинальному названию" },
    { value: "year", label: "Году создания" },
    { value: "totalRating", label: "Рейтингу" },
    { value: "price", label: "Цене" },
  ];

  const paginate = async (pageNumber, sortFieldName, sortDirection) => {
    try {
      await axios
        .get(
          `/api/movies?page=${pageNumber - 1}${
            filterContent["genres"] !== undefined
              ? `&genres=${filterContent["genres"]}`
              : ""
          }${
            filterContent["countries"] !== undefined
              ? `&countries=${filterContent["countries"]}`
              : ""
          }${
            filterContent["directors"] !== undefined
              ? `&directors=${filterContent["directors"]}`
              : ""
          }${
            sortFieldName
              ? `&sort=${sortFieldName.value},${sortDirection ? "asc" : "desc"}`
              : ""
          }`
        )
        .then((response) => {
          console.log(response);

          if (sortFieldName === undefined) {
            if (response.data.last === false) setActiveButton(false);
            else setActiveButton(true);

            setCurrentPage(() => currentPage + 1);
            setNumberOfElements(
              (prevNumber) => prevNumber + response.data.numberOfElements
            );
            setTotalElements(response.data.totalElements);
            setFilms((films) => [
              ...films,
              ...filmConstructor(response.data.content),
            ]);
            setLoading(false);
            setFetch(false);
          }

          if (sortFieldName !== undefined) {
            setSortValue(sortFieldName);
            setNumberOfElements(response.data.numberOfElements);
            setTotalElements(response.data.totalElements);
            setFilms(filmConstructor(response.data.content));
            setCurrentPage((currentPage) => currentPage + 1);
            setLoading(false);
            setFetch(false);

            if (!response.data.first) {
              setNumberOfElements((prev) => prev + numberOfElements);
            } else setNumberOfElements(response.data.numberOfElements);

            if (response.data.totalPages > 1 && !response.data.first) {
              setTotalElements(response.data.totalElements);

              setFilms(() => [
                ...films,
                ...filmConstructor(response.data.content),
              ]);

              if (response.data.last) {
                setActiveButton(true);
                setFetch(false);
              }
            }
          }

          if (
            (response.data.first && !response.data.last) ||
            (!response.data.first && !response.data.last)
          ) {
            setActiveButton(false);
          }

          if (response.data.first && response.data.last) setActiveButton(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    paginate(currentPage, options[0], arrowDirection);
    // eslint-disable-next-line
  }, []);

  return (
    <main className="HomePage">
      <div className="DescriptionWrapper">
        <hr className="FirstLine" />
        <div className="Description">
          Хотите посмотреть хороший фильм, но не знаете, какой выбрать? На
          данной странице собраны одни из лучших фильмов по различным жанрам, Вы
          сможете выбрать именно ту кинокартину, которая Вам действительно
          понравится и запомнится надолго.
        </div>
        <hr className="SecondLine" />
      </div>
      <OperationsSection
        options={options}
        sortValue={sortValue}
        filterContent={filterContent}
        setFilterContent={setFilterContent}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        paginate={paginate}
        arrowDirection={arrowDirection}
        setArrowDirection={setArrowDirection}
        setFetch={setFetch}
        isFetch={isFetch}
        setLoading={setLoading}
      />
      <AllFilms
        sortValue={sortValue}
        films={films}
        loading={loading}
        numberOfElements={numberOfElements}
        totalElements={totalElements}
        currentPage={currentPage}
        activeButton={activeButton}
        paginate={paginate}
        isFetch={isFetch}
        setFetch={setFetch}
        arrowDirection={arrowDirection}
      />
    </main>
  );
};

export default HomePage;
