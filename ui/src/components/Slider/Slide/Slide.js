import React from "react";
import { NavLink } from "react-router-dom";
import "./Slide.scss";

const Slide = (props) => (
  <NavLink
    to={`/${props.engTitle
      .split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ")
      .replace(/\s+/g, "")}`}
    className="Slide"
    style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
    }}
  >
    <p className="Title">
      {props.engTitle}
      <br />
      <span>{props.rusTitle}</span>
    </p>
  </NavLink>
);

export default Slide;
