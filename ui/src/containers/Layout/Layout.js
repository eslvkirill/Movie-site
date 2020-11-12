import React, { Component } from "react";
import "./Layout.scss";

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <div className="Content">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
