import React from "react";
import { render } from "@testing-library/react";

import SupervisionSuccess from "../SupervisionSuccess";
import SupervisionSuccessModelProvider from "../providers/SupervisionSuccessModelProvider";

jest.mock("../providers/SupervisionSuccessModelProvider", () => ({
  SupervisionSuccessModelProvider: jest.fn().mockReturnValue(null),
}));

describe("SupervisionSuccess tests", () => {
  const mockParams = {};
  it("should render provider", () => {
    render(<SupervisionSuccess params={mockParams} />);
    expect(SupervisionSuccessModelProvider).toBeCalled();
  });
});
