import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./OrderDetails.scss";

const OrderDetails = (props) => {
  return (
    <CSSTransition
      in={props.dropdown}
      appear={true}
      exit={true}
      unmountOnExit={true}
      classNames="fade"
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <div className="orderDetails basket">
        <div className="reviewWrapper myFilmsWrapper">
          {/* {loading ? (
          <ContentLoader />
        ) : ( */}
          <div className="content">
            {/* {films.map((film, index) => ( */}
            <div
              className="reviewCard myFilmsCard"
              // key={index} id={film.id}
            >
              <div className="myFilmsParts">
                <Link
                // to={`/api/movies/${film.id}`}
                // style={{
                //   backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1)),
                //   url("data:image/*;base64,${film.poster}")`,
                //   backgroundSize: "cover",
                //   backgroundPositionX: "center",
                //   backgroundPositionY: "center",
                //   backgroundRepeat: "no-repeat",
                // }}
                >
                  Постер
                </Link>
                <div className="InfoWrapper">
                  <div className="filmsInfo">
                    <div className="reviewElement reviewsTitle filmsTitle">
                      {/* {film.engTitle} */}
                      The Grang Budapest Hotel
                    </div>
                    <div className="reviewElement reviewsTitle filmsTitle">
                      {/* {film.rusTitle} */}
                      Отель "Гранд Будапешт"
                    </div>
                  </div>
                  <div className="filmsInfo">
                    <div className="reviewElement filmGenre">
                      {/* {film.genres} */}
                      комедия, драма, детектив
                    </div>
                    <div className="reviewElement reviewText myFilmsText">
                      {/* реж. {film.directors} ({film.year} г.) */}
                      реж. Уэс Андерсон (2014 г.)
                    </div>
                  </div>
                </div>
                <div className="filmPrice">
                  {/* {film.price}р. */}
                  249р.
                </div>
              </div>
            </div>

            {/* ))} */}
            {/* <div className="bottomOfBlock">
              {!films.length && !paid ? (
                <div className="emptyCart">Добавьте товары в корзину</div>
              ) : paid ? (
                <div className="emptyCart bought">
                  <div>Заказ успешно оплачен!</div>
                  <Link to="/">Перейти на главную страницу</Link>
                </div>
              ) : (
                <>
                  <div>Товаров в корзине: {films.length}</div>

                  <Button type="reset" onClick={clearCart}>
                    Очистить корзину
                  </Button>
                  <Button type="success" onClick={buyWindow}>
                    Оплатить заказ
                  </Button>
                  <div>Итог: {price} рублей</div>
                </>
              )}
            </div> */}
          </div>
          {/* )} */}
        </div>
      </div>
    </CSSTransition>
  );
};

export default OrderDetails;
