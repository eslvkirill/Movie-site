import React from "react";
import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";
import "./Header.scss";

const Header = () => (
  <header className="Header">
    <Logo />
    <Navbar />
  </header>
);

export default Header;
