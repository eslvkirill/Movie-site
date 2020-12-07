import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UiItem/Button/Button";
import "./Navbar.scss";

const Navbar = () => (
  <nav className="Navbar">
    <ul>
      <li>
        <Link className="list" to="/login">
          Войти
        </Link>
      </li>
      <li>
        <Link className="list" to="/creactionFilm">
          Создание
        </Link>
      </li>
      <li>
        <Link className="list" to="/adminPanel">
          Панель администратора
        </Link>
      </li>
      <li>
        {/* <form action="/logout" method="get"> */}
        <Button type="exit" className="submit">
          Выход
        </Button>
        {/* </form> */}
      </li>
      <li>
        <Link to="/" className="list">
          name
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
