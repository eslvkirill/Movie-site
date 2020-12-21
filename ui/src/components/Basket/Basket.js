import React from "react";
import Button from "../UiItem/Button/Button";
import "./Basket.scss";

const Basket = () => {
  return (
    <main className="basket">
      <div class="reviewWrapper myFilmsWrapper">
        <div class="content">
          <div class="reviewCard myFilmsCard">
            <div class="myFilmsParts">
              <a href="/api/movies/13">Постер</a>
              <div class="filmsInfo">
                <div class="reviewElement reviewsTitle filmsTitle">
                  The Grand Budapest Hotel
                </div>
                <div class="reviewElement reviewsTitle filmsTitle">
                  Отель «Гранд Будапешт»
                </div>
              </div>
              <div class="filmsInfo">
                <div class="reviewElement filmGenre">
                  комедия, детектив, приключение
                </div>
                <div class="reviewElement reviewText myFilmsText">
                  реж. Уэс Андерсон (2014 г.)
                </div>
              </div>
              <button type="submit">&times;</button>
            </div>
          </div>
        </div>
        <div className="bottomOfBlock">
          <div>Товаров в корзине: 1</div>
          <Button type="success">Оформление заказа</Button>
          <div>Итог: 220 рублей</div>
        </div>
      </div>
    </main>
  );
};

export default Basket;
