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
