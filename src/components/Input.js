import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { observer } from "mobx-react";
import "../scss/Input.scss";
const Input = ({ onChange, exchangeAmount, from, onFocus }) => {
  const numberMask = createNumberMask({
    thousandsSeparatorSymbol: " ",
    allowDecimal: true,
    prefix: from ? "- " : "+ "
  });
  return (
    <MaskedInput
      className="echangeInput"
      mask={numberMask}
      onChange={onChange}
      value={exchangeAmount || ""}
      onFocus={() => onFocus(from ? "from" : "to")}
    />
  );
};

export default observer(Input);
