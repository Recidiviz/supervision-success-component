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

import StatePicker from "../StatePicker";
import ImplementationPeriodPicker from "../ImplementationPeriodPicker";
import ProjectionsPicker from "../ProjectionsPicker";
import ChangeInRevocations from "../ChangeInRevocations";
import Chart from "../Chart/Chart";
import Outcomes from "../Outcomes";
import SupervisionSuccessComponent from "../SupervisionSuccess";

jest.mock("../StatePicker");
jest.mock("../ImplementationPeriodPicker");
jest.mock("../ProjectionsPicker");
jest.mock("../ChangeInRevocations");
jest.mock("../Chart/Chart");
jest.mock("../Outcomes");

describe("SupervisionSuccessComponent tests", () => {
  StatePicker.mockReturnValue(null);
  ImplementationPeriodPicker.mockReturnValue(null);
  ProjectionsPicker.mockReturnValue(null);
  ChangeInRevocations.mockReturnValue(null);
  Chart.mockReturnValue(null);
  Outcomes.mockReturnValue(null);

  it("should successfully render", () => {
    render(
      <SupervisionSuccessComponent
        isError
        year={2017}
        finalRevocations={12000}
        state="some state"
        onStateChange={jest.fn()}
        states={[]}
        changeInRevocations={40}
        onProjectionsChange={jest.fn()}
        onImplementationPeriodChange={jest.fn()}
        prisonPopulationDiff={42}
        chartData={[]}
        implementationPeriod={32}
        onChangeInRevocationsChange={jest.fn()}
        projections={3}
        savings={24}
      />
    );
  });
});
