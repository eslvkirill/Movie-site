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
import OrdersHistory from "./components/OrdersHistory/OrdersHistory";
import Basket from "./components/Basket/Basket";
import "./App.scss";

const app = (
  <Layout>
    <UserProvider>
      <Header />
      <Route path="/login" component={Auth} />
      <Route path="/registration" component={Registration} />
      <Route path="/adminPanel" component={AdminPanel} />
      <Route path="/myFilms" component={FilmCatalog} />
      <Route path="/basket" component={Basket} />
      <Route path="/ordersHistory" component={OrdersHistory} />
      <Route path="/api/movies/:id" component={FilmPage} />
      <Route exact path="/" component={HomePage} />
    </UserProvider>
  </Layout>
);

function App() {
  return <Switch>{app}</Switch>;
}

export default App;
