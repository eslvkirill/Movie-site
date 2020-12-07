import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { createSelect } from "../../../../../exportFunctions/creationEntity/createSelect";
import Select from "../../../../../components/UiItem/Select/Select";
import selectStyle from "../../../../../components/UiItem/Select/selectStyle";
import "./DropupBlock.scss";

function createNewSelect(
  placeholder,
  isMulti = true,
  closeMenuOnSelect = false
) {
  return createSelect({
    placeholder: placeholder,
    isMulti: isMulti,
    closeMenuOnSelect: closeMenuOnSelect,
  });
}

function createSelectControls() {
  return {
    genres: createNewSelect("По жанрам"),
    countries: createNewSelect("По странам"),
    directors: createNewSelect("По режиссёру", false, true),
  };
}

const DropupBlock = (props) => {
  const [selectControls, setSelectControls] = useState(createSelectControls());

  useEffect(() => {
    const loadSelectContent = async () => {
      try {
        await axios.get("/api/movies/filters").then((response) => {
          Object.keys(response.data).map((dataName) => {
            const data = response.data[dataName];

            let initialState = data.map((data, index) => ({
              label: data,
              value: index,
            }));

            if (dataName === "genres" || dataName === "directors") {
              initialState = response.data[dataName].map((content) => ({
                label: content.name,
                value: content.id,
              }));
            }

            Object.keys(selectControls).map((controlName) => {
              const control = selectControls[controlName];
              if (dataName === controlName) control.options = initialState;
              return selectControls;
            });

            return initialState;
          });
          setSelectControls(selectControls);
        });
      } catch (e) {
        console.log(e);
      }
    };
    loadSelectContent();
    // eslint-disable-next-line
  }, []);

  const onChangeSelectHandler = (event, controlName) => {
    const control = { ...selectControls[controlName] };
    control.value = event;

    if (control.isMulti === false && control.value !== null) {
      props.filterContent[controlName] = Object.values(control.value)[1];
    }
    if (control.isMulti === true && control.value !== null) {
      props.filterContent[controlName] = control.value.map((selectValue) =>
        controlName === "countries" ? selectValue.label : selectValue.value
      );
    }
    selectControls[controlName] = control;

    props.setFilterContent(props.filterContent);
    setSelectControls(selectControls);

    if (control.value === null) {
      props.filterContent[controlName] = undefined;
    }

    props.setCurrentPage(1);
    props.paginate(
      1,
      props.sortValue === undefined ? "" : props.sortValue,
      props.arrowDirection
    );
    props.setLoading(true);
  };

  const renderSelects = () => {
    return Object.keys(selectControls).map((controlName, index) => {
      const control = selectControls[controlName];
      return (
        <Select
          key={controlName + index}
          options={control.options}
          onChange={(event) => onChangeSelectHandler(event, controlName)}
          isMulti={control.isMulti}
          isSearchable={control.isSearchable}
          isClearable={control.isClearable}
          placeholder={control.placeholder}
          closeMenuOnSelect={control.closeMenuOnSelect}
          noOptionsMessage={control.noOptionsMessage}
          value={control.value}
          styles={selectStyle(
            272,
            15,
            "#4d0477b9",
            "#fceddcd8",
            "#fceddcd8",
            20,
            "#fceddcd8",
            "#fceddcd8",
            "#d67506af",
            270,
            "#d67506af",
            15,
            4,
            "85%",
            3.35,
            "solid",
            "#fceddcd8",
            "#995506",
            "#fceddcd8",
            "#d67506af",
            "#fceddcd8",
            17,
            180,
            "relative",
            0,
            "pointer",
            "75%",
            2
          )}
        />
      );
    });
  };

  return (
    <CSSTransition
      in={props.dropup}
      appear={true}
      exit={true}
      unmountOnExit={true}
      classNames="dropup"
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <div className="dropupBlock">
        {renderSelects()}
        <div
          className="closeDropup"
          onClick={() => props.setDropup(!props.dropup)}
        >
          ✖
        </div>
      </div>
    </CSSTransition>
  );
};

export default DropupBlock;
