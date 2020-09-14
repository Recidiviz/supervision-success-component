import React from "react";
import { render } from "@testing-library/react";

import SupervisionSuccess from "../SupervisionSuccess";
import SupervisionSuccessComponent from "../components/SupervisionSuccess";

jest.mock("../components/SupervisionSuccess");

describe("SupervisionSuccess tests", () => {
  const mockParams = {};

  it("should render provider", () => {
    SupervisionSuccessComponent.mockReturnValue(null);

    render(<SupervisionSuccess params={mockParams} />);

    expect(SupervisionSuccessComponent).toBeCalled();
  });
});
