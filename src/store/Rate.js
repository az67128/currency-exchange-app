import { types } from "mobx-state-tree";

const Rate = types.model("Rate", {
  currency: types.string,
  rate: types.number
});

export default Rate;
