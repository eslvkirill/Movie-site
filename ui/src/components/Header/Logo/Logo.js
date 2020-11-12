import React from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="Logo">
      <Link to="/">Film*s.ru</Link>
    </div>
  );
}
