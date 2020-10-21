import React, { Fragment } from "react";
import "./App.scss";
import LayoutHomePage from "./containers/LayoutHomePage/LayoutHomePage";
import HomePage from "./containers/HomePage/HomePage";
import Auth from "./containers/Auth/Auth";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import { Route, Switch } from "react-router-dom";

const app = (
  <Fragment>
    <LayoutHomePage>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Auth} />
      <Route path="/adminPanel" component={AdminPanel} />
    </LayoutHomePage>
  </Fragment>
);

function App() {
  return <Switch>{app}</Switch>;
}

export default App;
