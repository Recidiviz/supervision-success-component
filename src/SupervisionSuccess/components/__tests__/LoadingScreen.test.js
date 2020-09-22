import React from "react";
import { render } from "@testing-library/react";

import LoadingScreen from "../LoadingScreen";

describe("LoadingScreen tests", () => {
  it("should successfully render", () => {
    render(<LoadingScreen />);
  });
});
