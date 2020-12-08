import React from "react";
import GenreList from "./GenreList/GenreList";
import PersonList from "./PersonList/PersonList";
import FilmList from "./FilmList/FilmList";
import "./AdminPanel.scss";

const AdminPanel = () => (
  <div className="adminPanel">
    <PersonList />
    <GenreList />
    <FilmList />
  </div>
);

export default AdminPanel;
