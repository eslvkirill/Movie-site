import React from "react";
import classes from "./HomePage.module.scss";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className={classes.HomePage}>
      <h1>Главная страница сайта</h1>
      <NavLink to="/login">
        <div>Страница логина</div>
      </NavLink>
      <NavLink to="/adminPanel">
        <div>Панель администратора</div>
      </NavLink>
    </div>
  );
}

export default HomePage;
