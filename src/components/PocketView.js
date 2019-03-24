import React from "react";
import { observer } from "mobx-react";
import Input from "./Input";

const PocketView = ({ pocket, setActivePocket, from, rate }) => {
  return (
    <div className="pocketView">
      <div>
        <div className="pocketView__currency">{pocket.currency}</div>
        <div className="pocketView__youHave">You have {pocket.value}</div>
      </div>
      <div>
        <Input
          onChange={pocket.onChange}
          exchangeAmount={pocket.exchangeAmount}
          from={from ? true : false}
          onFocus={setActivePocket}
        />
        <div>{rate}</div>
      </div>
    </div>
  );
};

export default observer(PocketView);
