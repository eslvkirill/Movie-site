import React from "react";
import "./App.scss";
import LayoutHomePage from "./containers/LayoutHomePage/LayoutHomePage";
import HomePage from "./components/HomePage/HomePage";

const app = (
  <LayoutHomePage>
    <HomePage />
  </LayoutHomePage>
);

function App() {
  return app;
}

export default App;
