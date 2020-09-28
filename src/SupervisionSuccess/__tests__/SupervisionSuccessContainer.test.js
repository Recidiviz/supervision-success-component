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
import { act, render } from "@testing-library/react";

import params from "../model/__mocks__/params.mock";

import SupervisionSuccessContainer from "../SupervisionSuccessContainer";
import SupervisionSuccessComponent from "../components/SupervisionSuccess";
import produceProjections from "../model/produceProjections";

jest.mock("../model/produceProjections");
jest.mock("../components/SupervisionSuccess", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));

describe("SupervisionSuccessContainer tests", () => {
  const mockState = Object.keys(params)[1];
  const mockImplementationPeriod = 9248;
  const mockChartData = "some chart data";
  const mockFinalRevocations = 14920;
  const mockSavings = "some savings";
  const mockPrisonPopulationDiff = "some diff";
  const mockProjections = "some projections";
  const mockChangeInRevocations = "some change in revo";
  const mockYear = 2017;

  beforeAll(() => {
    produceProjections.mockReturnValue({
      chartData: mockChartData,
      savings: mockSavings,
      prisonPopulationDiff: mockPrisonPopulationDiff,
      finalRevocations: mockFinalRevocations,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render SupervisionSuccessComponent", () => {
    render(<SupervisionSuccessContainer params={params} />);

    expect(SupervisionSuccessComponent).toBeCalled();
  });

  it("should not be updated if isError = true", () => {
    render(<SupervisionSuccessContainer isError params={params} />);

    expect(SupervisionSuccessComponent).toHaveBeenCalledTimes(1);
  });

  it("should be updated with transformed data on mount", () => {
    render(<SupervisionSuccessContainer params={params} />);

    expect(produceProjections).toBeCalled();
    expect(SupervisionSuccessComponent).toHaveBeenCalledTimes(2);
    expect(SupervisionSuccessComponent.mock.calls[1][0]).toMatchObject({
      savings: mockSavings,
      chartData: mockChartData,
      prisonPopulationDiff: mockPrisonPopulationDiff,
      finalRevocations: mockFinalRevocations,
      year: mockYear,
    });
  });

  it("should change state", () => {
    render(<SupervisionSuccessContainer params={params} />);

    act(() => {
      SupervisionSuccessComponent.mock.calls[0][0].onStateChange(mockState);
    });
    expect(SupervisionSuccessComponent.mock.calls[2][0].state).toBe(mockState);
  });

  it("should change implementation period", () => {
    render(<SupervisionSuccessContainer params={params} />);

    act(() => {
      SupervisionSuccessComponent.mock.calls[0][0].onImplementationPeriodChange(
        mockImplementationPeriod
      );
    });
    expect(SupervisionSuccessComponent.mock.calls[2][0].implementationPeriod).toBe(
      mockImplementationPeriod
    );
  });

  it("should change projections", () => {
    render(<SupervisionSuccessContainer params={params} />);

    act(() => {
      SupervisionSuccessComponent.mock.calls[0][0].onProjectionsChange(mockProjections);
    });
    expect(SupervisionSuccessComponent.mock.calls[2][0].projections).toBe(mockProjections);
  });

  it("should change changeInRevocations", () => {
    render(<SupervisionSuccessContainer params={params} />);

    act(() => {
      SupervisionSuccessComponent.mock.calls[0][0].onChangeInRevocationsChange(
        mockChangeInRevocations
      );
    });
    expect(SupervisionSuccessComponent.mock.calls[2][0].changeInRevocations).toBe(
      mockChangeInRevocations
    );
  });
});
