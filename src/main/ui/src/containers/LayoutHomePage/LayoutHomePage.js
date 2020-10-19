import React, { Component } from "react";
import classes from "./LayoutHomePage.module.scss";

class LayoutHomePage extends Component {
  render() {
    return (
      <div className={classes.LayoutHomePage}>
        <main> {this.props.children}</main>
      </div>
    );
  }
}

export default LayoutHomePage;
