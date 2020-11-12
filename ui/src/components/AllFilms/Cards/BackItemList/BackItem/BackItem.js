import React from "react";
import { NavLink } from "react-router-dom";
// import Radium from "radium";
import "./BackItem.scss";

const BackItem = (props) => (
  <li className="BackItem">
    <NavLink to={`k`}>
      <div
        style={{
          ":hover": {
            transition: "0.2s",
          },
        }}
      >
        {props.film} KK
        <br />
        <span>{props.film} KK</span>
      </div>
    </NavLink>
  </li>
);

export default BackItem;
