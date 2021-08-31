// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
import React from "react";
import { render } from "@testing-library/react";

import Outcomes from "../Outcomes";
import prettifySavings from "../../utils/prettifySavings";

jest.mock("../../utils/prettifySavings");

describe("Outcomes tests", () => {
  prettifySavings.mockImplementation((v) => v);

  it("Should render positive results", () => {
    const { getByText } = render(
      <Outcomes savings={15} prisonPopulationDiff={-300} projections={1} />
    );

    expect(getByText("Fewer people in prison")).toBeInTheDocument();
    expect(getByText("Reduced costs")).toBeInTheDocument();
    expect(getByText("15")).toBeInTheDocument();
    expect(getByText("300")).toBeInTheDocument();
  });

  it("Should render negative results", () => {
    const { getByText } = render(
      <Outcomes savings={-15} prisonPopulationDiff={1} projections={1} />
    );

    expect(getByText("More people in prison")).toBeInTheDocument();
    expect(getByText("Increased costs")).toBeInTheDocument();
    expect(getByText("-15")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });

  it("Should render neutral results", () => {
    const { getByText } = render(<Outcomes savings={0} prisonPopulationDiff={0} projections={1} />);

    expect(getByText("No change in population")).toBeInTheDocument();
    expect(getByText("No change in cost")).toBeInTheDocument();
  });

  it("Should render '-' if isError = true", () => {
    const { findAllByText } = render(
      <Outcomes isError savings={0} prisonPopulationDiff={0} projections={1} />
    );

    expect(findAllByText("-")).resolves.toHaveLength(2);
  });

  it("Should render correct heading", () => {
    const { getByText } = render(
      <Outcomes isError savings={0} prisonPopulationDiff={0} projections={1} />
    );

    expect(getByText("Outcomes over 1 year")).toBeInTheDocument();
  });
});
