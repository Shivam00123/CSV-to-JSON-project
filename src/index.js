import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { configStore } from "./redux/store";

let store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
