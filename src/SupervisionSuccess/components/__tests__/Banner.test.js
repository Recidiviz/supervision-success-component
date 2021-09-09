// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
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
import Banner from "../Banner";

describe("Banner tests", () => {
  const mockYear = 2019;
  const mockChangeInRevocations = 42;
  const mockChangeInNewAdmissions = -42;
  const mockoOnReset = jest.fn();

  it("should successfully render", () => {
    render(
      <Banner
        year={mockYear}
        changeInRevocations={mockChangeInRevocations}
        changeInNewAdmissions={mockChangeInNewAdmissions}
        onReset={mockoOnReset}
      />
    );
  });

  it("should successfully render banner text", () => {
    const { getByText } = render(
      <Banner
        year={mockYear}
        changeInRevocations={mockChangeInRevocations}
        changeInNewAdmissions={mockChangeInNewAdmissions}
        onReset={mockoOnReset}
      />
    );

    expect(
      getByText(
        "This model estimates the change in prison population over time if supervision revocations and new admissions return to 2019 levels. Use the sliders below to model the outcomes of maintaining 2020 levels, or to test out other scenarios."
      )
    ).toBeInTheDocument();
  });

  it("should successfully disable `Reset` button if changes are 0", () => {
    const { getByText } = render(
      <Banner
        year={mockYear}
        changeInRevocations={0}
        changeInNewAdmissions={0}
        onReset={mockoOnReset}
      />
    );

    expect(getByText("Reset")).toBeDisabled();
  });
});
