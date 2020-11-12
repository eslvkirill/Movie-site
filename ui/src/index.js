import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(<>{app}</>, document.getElementById("root"));

serviceWorker.unregister();
