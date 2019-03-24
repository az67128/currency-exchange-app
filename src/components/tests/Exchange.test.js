import React from "react";
import ReactDOM from "react-dom";
import Exchange from "../Exchange";

const pockets = [
  { currency: "GBP", availableAmount: 2 },
  { currency: "USD", availableAmount: 1 },
  { currency: "EUR", availableAmount: 1 }
];
describe("Exchange unit test", () => {
  it("Exchange renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Exchange pockets={pockets} />, div);
  });
  it("Exchange renders 6 pockets. 3 from, 3 to", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Exchange pockets={pockets} />, div);
    expect(div.querySelectorAll(".pocketView").length).toBe(6);
    expect(
      div.querySelectorAll(".exchange__toCurrency .pocketView").length
    ).toBe(3);
    expect(
      div.querySelectorAll(".exchange__fromCurrency .pocketView").length
    ).toBe(3);
  });
});
