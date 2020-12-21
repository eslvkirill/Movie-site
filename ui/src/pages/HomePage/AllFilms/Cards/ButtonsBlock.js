import React from "react";
import Button from "../../../../components/UiItem/Button/Button";

const ButtonsBlock = (props) => (
  <div className="bottomOfCard">
    <div className="buttonsWrapper">
      <Button type="success onAdd">{props.label}</Button>
      <Button type="success onBuy">
        Купить за <span>{props.price}</span>р
      </Button>
    </div>
  </div>
);

export default ButtonsBlock;
