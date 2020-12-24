import React, { useState } from "react";
import OrderDetails from "./OrderDetails/OrderDetails";
import "./Order.scss";

const Order = () => {
  const [dropdown, setDropdawn] = useState(false);
  return (
    <main className="orderWrapper">
      <div className="reviewWrapper myFilmsWrapper">
        <div className="order">
          <div>
            <div className="numberOfOrder">
              Номер заказа: <span>123456</span>
            </div>
            <div className="dateOrder">
              Дата заказа: <span>22/12/2020</span>
            </div>
            <div className="priceOrder">
              Общая сумма: <span>249 р.</span>
            </div>
          </div>
          <div
            onClick={() => setDropdawn(!dropdown)}
            className={dropdown ? "down" : "up"}
          >
            ➤
          </div>
        </div>
      </div>

      <OrderDetails dropdown={dropdown} />
    </main>
  );
};

export default Order;
