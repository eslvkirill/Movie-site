import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./components/Auth/Auth";
import Registration from "./components/Auth/Registration/Registration";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import FilmCreactionPanel from "./containers/FilmCreationPanel/FilmCreationPanel";
import Header from "./components/Header/Header";
import FilmPage from "./pages/FilmPage/FilmPage";
import "./App.scss";

const app = (
  <Layout>
    <Header />
    <Route path="/login" component={Auth} />
    <Route path="/registration" component={Registration} />
    <Route path="/adminPanel" component={AdminPanel} />
    <Route path="/creactionFilm" component={FilmCreactionPanel} />
    <Route path="/api/movies/:id" component={FilmPage} />
    <Route exact path="/" component={HomePage} />
  </Layout>
);

function App() {
  return <Switch>{app}</Switch>;
}

export default App;
