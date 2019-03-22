import React from "react";
import { observer, inject } from "mobx-react";
import Exchange from "./Exchange";
import "../scss/App.scss";
import TopBar from "./TopBar";

const App = ({ store }) => {
  return (
    <div className="content">
      <TopBar
        canExchange={store.canExchange}
        exchange={store.exchange}
        rate={store.getPocketRate("from")}
      />
      <Exchange
        pockets={store.pockets}
        from={store.from}
        to={store.to}
        changeSlideFrom={store.changeSlideFrom}
        changeSlideTo={store.changeSlideTo}
        setActivePocket={store.setActivePocket}
        rate={store.getPocketRate("to")}
      />
    </div>
  );
};

export default inject("store")(observer(App));
