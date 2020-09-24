import React from "react";
import { render } from "@testing-library/react";

import Outcomes from "../Outcomes";
import prettifySavings from "../../utils/prettifySavings";

jest.mock("../../utils/prettifySavings");

describe("Outcomes tests", () => {
  prettifySavings.mockImplementation((v) => v);

  it("Should render positive results", () => {
    const { getByText } = render(<Outcomes savings={15} prisonPopulationDiff={-300} />);

    expect(getByText("Fewer people in prison")).toBeInTheDocument();
    expect(getByText("Reduced costs")).toBeInTheDocument();
    expect(getByText("15")).toBeInTheDocument();
    expect(getByText("300")).toBeInTheDocument();
  });

  it("Should render negative results", () => {
    const { getByText } = render(<Outcomes savings={-15} prisonPopulationDiff={1} />);

    expect(getByText("More people in prison")).toBeInTheDocument();
    expect(getByText("Increased costs")).toBeInTheDocument();
    expect(getByText("-15")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });

  it("Should render neutral results", () => {
    const { getByText } = render(<Outcomes savings={0} prisonPopulationDiff={0} />);

    expect(getByText("No change in population")).toBeInTheDocument();
    expect(getByText("No change in cost")).toBeInTheDocument();
  });
});
