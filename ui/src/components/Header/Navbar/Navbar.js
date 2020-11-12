import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UiItem/Button/Button";
import "./Navbar.scss";

const Navbar = () => (
  <nav>
    <ul>
      <li id="sec">
        <Link className="headline" to="/login" id="second">
          Логин
        </Link>
      </li>
      <li id="thr">
        <Link className="headline" to="/hotel" id="third">
          Фильм
        </Link>
      </li>
      <li id="fou">
        <Link className="headline" to="/creactionFilm" id="four">
          Создание
        </Link>
      </li>

      <li id="one">
        <Link className="headline" to="/adminPanel" id="first">
          Панель администратора
        </Link>
      </li>

      <li id="last">
        {/* <form action="/logout" method="post"> */}
        <Button id="exit" type="exit" className="submit">
          Выход
        </Button>
        {/* </form> */}
      </li>
      <li id="name">
        <Link to="/" className="headline" id="first">
          name
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
