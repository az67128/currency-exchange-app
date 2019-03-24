import React from "react";
import ReactDOM from "react-dom";
import Input from "../Input";

describe("Input unit test", () => {
  it("Input renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div);
  });
  it("Input can set value & input mask is working", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input exchangeAmount={1} />, div);
    expect(div.querySelector("input").value).toBe("+ 1");
  });
});
