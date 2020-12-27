import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetails from "./OrderDetails/OrderDetails";
import { filmConstructor } from "../../exportFunctions/filmConstructor/filmConstructor";
import ContentLoader from "../UiItem/Loaders/ContentLoader/ContentLoader";
import "./Order.scss";

const Order = () => {
  const [dropdown, setDropdawn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        await axios.get("/api/users/orders").then((response) => {
          console.log(response);
          if (response.data.length !== 0) {
            setOrders(response.data);
            setLoading(true);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getAllOrders();
    // eslint-disable-next-line
  }, []);

  const getOrderDetails = async (orderId) => {
    try {
      await axios
        .get(`/api/users/orders/${orderId}/order-details`)
        .then((response) => {
          console.log(response);
          setOrderDetails(filmConstructor(response.data.content));
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="orderWrapper">
      {loading ? (
        <div>
          {orders.map((order, index) => (
            <div className="reviewWrapper myFilmsWrapper" key={order.id}>
              <div className="order">
                <div>
                  <div className="numberOfOrder">
                    Номер заказа: <span>{order.id}</span>
                  </div>
                  <div className="dateOrder">
                    Дата заказа: <span>{order.datetime}</span>
                  </div>
                  <div className="priceOrder">
                    Общая сумма: <span>{order.totalPrice} р.</span>
                  </div>
                </div>
                <div
                  id={order.id}
                  onClick={(orderId) => {
                    if (!dropdown) {
                      getOrderDetails(order.id);
                      // console.log(orderId);
                      setDropdawn(!dropdown);
                    }
                    setDropdawn(!dropdown);
                  }}
                  className={dropdown ? "down" : "up"}
                >
                  ➤
                </div>
              </div>
              <OrderDetails
                dropdown={dropdown}
                orderDetails={orderDetails}
                orderId={order.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <ContentLoader />
      )}
    </main>
  );
};

export default Order;
