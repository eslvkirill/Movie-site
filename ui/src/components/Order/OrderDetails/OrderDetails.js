import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import PaginateLoader from "../../UiItem/Loaders/ButtonsLoader/PaginateLoader/PaginateLoader";
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
      {props.orderDetails.length === 0 ? (
        <PaginateLoader />
      ) : (
        <div className="orderDetails basket">
          <div className="reviewWrapper myFilmsWrapper">
            <div className="content">
              {props.orderDetails.map((details, index) => (
                <div
                  className="reviewCard myFilmsCard"
                  key={index}
                  id={details.id}
                >
                  <div className="myFilmsParts">
                    <Link
                      to={`/api/movies/${details.id}`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1)),
                  url("data:image/*;base64,${details.poster}")`,
                        backgroundSize: "cover",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></Link>
                    <div className="InfoWrapper">
                      <div className="filmsInfo">
                        <div className="reviewElement reviewsTitle filmsTitle">
                          {details.engTitle}
                        </div>
                        <div className="reviewElement reviewsTitle filmsTitle">
                          {details.rusTitle}
                        </div>
                      </div>
                      <div className="filmsInfo">
                        <div className="reviewElement filmGenre">
                          {details.genres}
                        </div>
                        <div className="reviewElement reviewText myFilmsText">
                          реж. {details.directors} ({details.year} г.)
                        </div>
                      </div>
                    </div>
                    <div className="filmPrice">{details.price}р.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CSSTransition>
  );
};

export default OrderDetails;
