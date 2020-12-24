import React from "react";
import { Route, Switch } from "react-router-dom";
import { UserProvider } from "./containers/UserContext/UserContext";
import Layout from "./containers/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Auth from "./components/Auth/Auth";
import Registration from "./components/Auth/Registration/Registration";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Header from "./components/Header/Header";
import FilmPage from "./pages/FilmPage/FilmPage";
import FilmCatalog from "./components/FilmCatalog/FilmCatalog";
import Order from "./components/Order/Order";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import GenreList from "./components/AdminPanel/GenreList/GenreList";
import PersonList from "./components/AdminPanel/PersonList/PersonList";
import FilmList from "./components/AdminPanel/FilmList/FilmList";
import Charts from "./components/AdminPanel/Сharts/Сharts";
import "./App.scss";

const app = (
  <Layout>
    <UserProvider>
      <Header />
      <Route path="/login" component={Auth} />
      <Route path="/registration" component={Registration} />
      <Route path="/adminPanel" component={AdminPanel} />
      <Route path="/myFilms" component={FilmCatalog} />
      <Route path="/shoppingCart" component={ShoppingCart} />
      <Route path="/orders" component={Order} />
      <Route path="/adminPanel/charts" component={Charts} />
      <Route path="/adminPanel/genres" component={GenreList} />
      <Route path="/adminPanel/persons" component={PersonList} />
      <Route path="/adminPanel/films" component={FilmList} />
      <Route path="/api/movies/:id" component={FilmPage} />
      <Route exact path="/" component={HomePage} />
    </UserProvider>
  </Layout>
);

function App() {
  return <Switch>{app}</Switch>;
}

export default App;
