import React from "react";
import GenreList from "./GenreList/GenreList";
import PersonList from "./PersonList/PersonList";
import "./AdminPanel.scss";

const AdminPanel = () => (
  <div className="adminPanel">
    <PersonList />
    <GenreList />
  </div>
);

export default AdminPanel;
