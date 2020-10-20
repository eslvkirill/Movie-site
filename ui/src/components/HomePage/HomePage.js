import React from "react";
import classes from "./HomePage.module.scss";
import Auth from "../../containers/Auth/Auth";

function HomePage() {
  return (
    <div className={classes.HomePage}>
      <Auth />
    </div>
  );
}

export default HomePage;
