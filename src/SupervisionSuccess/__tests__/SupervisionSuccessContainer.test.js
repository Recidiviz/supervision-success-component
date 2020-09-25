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
    render(<SupervisionSuccessContainer params={params} />);
  });

  it("should render SupervisionSuccessComponent", () => {
    expect(SupervisionSuccessComponent).toBeCalled();
  });

  it("should be updated with transformed data on mount", () => {
    expect(produceProjections).toBeCalled();
    expect(SupervisionSuccessComponent.mock.calls[1][0]).toMatchObject({
      savings: mockSavings,
      chartData: mockChartData,
      prisonPopulationDiff: mockPrisonPopulationDiff,
      finalRevocations: mockFinalRevocations,
      year: mockYear,
    });
  });

  it("should change state", () => {
    act(() => {
      SupervisionSuccessComponent.mock.calls[0][0].onStateChange(mockState);
    });
    expect(SupervisionSuccessComponent.mock.calls[2][0].state).toBe(mockState);
  });

  it("should change implementation period", () => {
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
    act(() => {
      SupervisionSuccessComponent.mock.calls[0][0].onProjectionsChange(mockProjections);
    });
    expect(SupervisionSuccessComponent.mock.calls[2][0].projections).toBe(mockProjections);
  });

  it("should change changeInRevocations", () => {
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
