import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../../components/UiItem/Button/Button";

const ButtonsBlock = (props) => {
  const [cartButton, setCartButton] = useState(null);

  useEffect(() => {
    setCartButton(
      props.operation === "ADD"
        ? false
        : props.operation === "REMOVE"
        ? true
        : null
    );
    // eslint-disable-next-line
  }, []);

  const addToCart = async () => {
    try {
      await axios({
        method: "post",
        contentType: "application/json",
        url: `/api/users/cart/${props.filmId}`,
        data: props.filmId,
      });
      setCartButton(!cartButton);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFromCart = async () => {
    try {
      await axios.delete(`/api/users/cart/${props.filmId}`);
      setCartButton(!cartButton);
    } catch (e) {
      console.log(e);
    }
  };

  const renderButtonsLabel = () => {
    if (
      (props.operation === "ADD" && !cartButton) ||
      !cartButton ||
      props.user === null
    ) {
      return (
        <>
          Купить за <span>{props.price}</span>р
        </>
      );
    }
    if (props.operation === "REMOVE" || cartButton) {
      return (
        <div
          style={{
            height: 33.6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Убрать из корзины
        </div>
      );
    }
  };

  return (
    <div className="bottomOfCard">
      <div className="buttonsWrapper">
        {/* <Button type="success onAdd">{props.label}</Button> */}
        <Button
          type="success onBuy"
          onClick={() => {
            if (
              props.user !== null &&
              ((props.operation === "REMOVE" && !cartButton) ||
                (props.operation === "ADD" && !cartButton))
            ) {
              addToCart();

              props.setAuthForm(false);
            }
            if (props.user === null) props.setAuthForm(true);
            else if (
              props.user !== null &&
              ((props.operation === "REMOVE" && cartButton) ||
                (props.operation === "ADD" && cartButton))
            ) {
              deleteFromCart();
            }
          }}
        >
          {renderButtonsLabel()}
        </Button>
      </div>
    </div>
  );
};

export default ButtonsBlock;
