import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./components/Auth/Auth";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import FilmCreactionPanel from "./containers/FilmCreationPanel/FilmCreationPanel";
import FilmPage from "./pages/FilmPage/FilmPage";
import "./App.scss";

const app = (
  <Fragment>
    <Layout>
      <Route path="/login" component={Auth} />
      <Route path="/adminPanel" component={AdminPanel} />
      <Route path="/creactionFilm" component={FilmCreactionPanel} />
      <Route path="/hotel" component={FilmPage} />
      <Route exact path="/" component={HomePage} />
    </Layout>
  </Fragment>
);

function App() {
  return <Switch>{app}</Switch>;
}

export default App;
