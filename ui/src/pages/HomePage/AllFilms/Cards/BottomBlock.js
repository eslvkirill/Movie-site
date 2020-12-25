import React from "react";
// import selectStyle from "../../../../components/UiItem/Select/selectStyle";
// import Select from "../../../../components/UiItem/Select/Select";
import ButtonsBlock from "./ButtonsBlock/ButtonsBlock";

const BottomBlock = (props) => (
  <div className="bottomOfCard">
    <div className="categoryList">
      {/* <div className="addLabel">Добавить в:</div>
      <Select
        placeholder="Выберите категорию"
        noOptionsMessage={() => "Список пуст"}
        styles={selectStyle(
          230,
          15,
          "#c76c04",
          "#fff",
          "#fff",
          16,
          "#fff",
          "#fff",
          "rgb(252, 237, 220)",
          198,
          "rgb(252, 237, 220)",
          17
        )}
      /> */}
    </div>
    <ButtonsBlock
      price={props.price}
      // label={props.label}
      user={props.user}
      setAuthForm={props.setAuthForm}
      filmId={props.filmId}
      operation={props.operation}
      film={props.film}
    />
  </div>
);

export default BottomBlock;
