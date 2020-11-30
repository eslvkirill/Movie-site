import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./containers/ScrollToTop/ScrollToTop";
import App from "./App";
import "./index.scss";

const app = (
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
ReactDOM.render(
  app,
  document.getElementById("root")
);

serviceWorker.unregister();
