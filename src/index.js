import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "mobx-react";
import Store from "./store/Store";

function rnd(min, max) {
  return Math.floor(Math.random() * max) + min;
}
const store = Store.create({
  pockets: [
    { currency: "GBP", availableAmount: rnd(10, 100) },
    { currency: "USD", availableAmount: rnd(10, 100) },
    { currency: "EUR", availableAmount: rnd(10, 100) }
  ]
});
window.store = store;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
