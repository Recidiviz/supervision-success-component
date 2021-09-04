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
  const mockOnMaintain2020Levels = jest.fn();

  it("should successfully render", () => {
    render(
      <Banner
        isNotAvailable2020={false}
        year={mockYear}
        changeInRevocations={mockChangeInRevocations}
        changeInNewAdmissions={mockChangeInNewAdmissions}
        onReset={mockoOnReset}
        onMaintain2020Levels={mockOnMaintain2020Levels}
      />
    );
  });

  it("should successfully render w/ 2020 data", () => {
    const { getByText } = render(
      <Banner
        isNotAvailable2020={false}
        year={mockYear}
        changeInRevocations={mockChangeInRevocations}
        changeInNewAdmissions={mockChangeInNewAdmissions}
        onReset={mockoOnReset}
        onMaintain2020Levels={mockOnMaintain2020Levels}
      />
    );

    expect(
      getByText(
        "This model estimates the change in prison population over time if supervision revocations and new admissions return to 2019 levels. Use the button below to model the outcomes of maintaining 2020 levels, or use the sliders to test out other scenarios."
      )
    ).toBeInTheDocument();
    expect(getByText("Maintain 2020 levels")).toBeInTheDocument();
  });

  it("should successfully render w/o 2020 data", () => {
    const { getByText, queryByText } = render(
      <Banner
        isNotAvailable2020
        year={mockYear}
        changeInRevocations={mockChangeInRevocations}
        changeInNewAdmissions={mockChangeInNewAdmissions}
        onReset={mockoOnReset}
        onMaintain2020Levels={mockOnMaintain2020Levels}
      />
    );

    expect(
      getByText(
        "This model estimates the change in prison population if supervision revocations and new admissions return to 2019 levels. Use the sliders to see the effect of changing the parole and probation revocations or new admissions levels moving forward."
      )
    ).toBeInTheDocument();
    expect(queryByText("Maintain 2020 levels")).not.toBeInTheDocument();
  });

  it("should successfully disable `Reset` button if changes are 0", () => {
    const { getByText } = render(
      <Banner
        isNotAvailable2020={false}
        year={mockYear}
        changeInRevocations={0}
        changeInNewAdmissions={0}
        onReset={mockoOnReset}
        onMaintain2020Levels={mockOnMaintain2020Levels}
      />
    );

    expect(getByText("Reset")).toBeDisabled();
  });

  it("should successfully disable `Maintain 2020 levels` button under certain conditions", () => {
    const { getByText } = render(
      <Banner
        isNotAvailable2020={false}
        year={mockYear}
        changeInRevocations={-21}
        changeInNewAdmissions={-14}
        onReset={mockoOnReset}
        onMaintain2020Levels={mockOnMaintain2020Levels}
      />
    );

    expect(getByText("Maintain 2020 levels")).toBeDisabled();
  });
});
