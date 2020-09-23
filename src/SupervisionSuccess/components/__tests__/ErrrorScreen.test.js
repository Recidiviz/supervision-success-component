import React from "react";
import { render } from "@testing-library/react";

import ErrorScreen from "../ErrorScreen";

describe("ErrorScreen tests", () => {
  const mockError = "some mock error";

  it("should successfully render", () => {
    const { getByText } = render(<ErrorScreen error={mockError} />);

    expect(getByText(mockError)).toBeInTheDocument();
  });
});
