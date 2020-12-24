import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminPanel.scss";

const AdminPanel = () => {
  const links = [
    { to: "/adminPanel/charts", label: "Статистика" },
    { to: "/adminPanel/genres", label: "Создание жанров" },
    { to: "/adminPanel/persons", label: "Создание людей" },
    { to: "/adminPanel/films", label: "Создание фильмов" },
  ];

  return (
    <div className="adminPanel">
      <ul className="menuPanel">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink activeClassName="active" className="link" to={link.to}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
