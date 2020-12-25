import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../UiItem/Button/Button";
import ContentLoader from "../UiItem/Loaders/ContentLoader/ContentLoader";
import { filmConstructor } from "../../exportFunctions/filmConstructor/filmConstructor";
import "./ShoppingCart.scss";

const ShoppingCart = () => {
  const [films, setFilms] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const getFilmsFromCart = async () => {
      try {
        const response = await axios.get(`/api/users/cart`);
        console.log(response);
        setFilms(filmConstructor(response.data));
        setPrice(
          response.data.map((film) => film.price).reduce((a, b) => a + b, 0)
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getFilmsFromCart();
    // eslint-disable-next-line
  }, []);

  const removeFromCart = async (filmId) => {
    try {
      await axios
        .delete(`/api/users/cart/${filmId}`)
        .then(() => setFilms(films.filter((film) => film.id !== filmId)));
      const response = await axios.get(`/api/users/cart`);
      setPrice(
        response.data.map((film) => film.price).reduce((a, b) => a + b, 0)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`/api/users/cart`).then((res) => {
        console.log(res);
        setFilms([]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const orderPayment = async () => {
    try {
      await axios.post(`/api/users/orders`).then((res) => {
        console.log(res);
        setPaid(true);
        setFilms([]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="basket">
      <div className="reviewWrapper myFilmsWrapper">
        {loading ? (
          <ContentLoader />
        ) : (
          <div className="content">
            {films.map((film, index) => (
              <div className="reviewCard myFilmsCard" key={index} id={film.id}>
                <div className="myFilmsParts">
                  <Link
                    to={`/api/movies/${film.id}`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1)), 
                      url("data:image/*;base64,${film.poster}")`,
                      backgroundSize: "cover",
                      backgroundPositionX: "center",
                      backgroundPositionY: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></Link>
                  <div className="InfoWrapper">
                    <div className="filmsInfo">
                      <div className="reviewElement reviewsTitle filmsTitle">
                        {film.engTitle}
                      </div>
                      <div className="reviewElement reviewsTitle filmsTitle">
                        {film.rusTitle}
                      </div>
                    </div>
                    <div className="filmsInfo">
                      <div className="reviewElement filmGenre">
                        {film.genres}
                      </div>
                      <div className="reviewElement reviewText myFilmsText">
                        реж. {film.directors} ({film.year} г.)
                      </div>
                    </div>
                  </div>
                  <div className="price">{film.price}р.</div>
                  <button type="submit" onClick={() => removeFromCart(film.id)}>
                    &times;
                  </button>
                </div>
              </div>
            ))}
            <div className="bottomOfBlock">
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
                  <Button type="success" onClick={orderPayment}>
                    Оплатить заказ
                  </Button>
                  <div>Итог: {price} рублей</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShoppingCart;
