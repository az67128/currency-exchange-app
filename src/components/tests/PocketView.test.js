import React from "react";
import ReactDOM from "react-dom";
import PocketView from "../PocketView";

describe("PocketView unit test", () => {
  it("PocketView renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PocketView pocket />, div);
  });
});
