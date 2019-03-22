import React from "react";
import { observer } from "mobx-react";

const TopBar = ({ canExchange, exchange, rate }) => {
  return (
    <div className="exchange__topBar">
      <div />
      <div>{rate}</div>
      <div>
        {canExchange && (
          <button className="topBar__button" onClick={exchange}>
            Exchange
          </button>
        )}
      </div>
    </div>
  );
};

export default observer(TopBar);
