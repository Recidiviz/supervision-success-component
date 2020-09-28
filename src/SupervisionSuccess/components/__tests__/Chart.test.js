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
import { Line } from "react-chartjs-2";
import { render } from "@testing-library/react";

import Chart from "../Chart";
import {
  BASELINE_COLOR,
  TRANSPARENT_COLOR,
  TOTAL_POPULATION_COLOR,
  CONNECTING_LINE_COLOR,
} from "../Chart/Chart";
import useIsMobile from "../../utils/useIsMobile";

jest.mock("react-chartjs-2");
jest.mock("../../utils/useIsMobile");

describe("Chart tests", () => {
  Line.mockReturnValue(null);
  const mockData = [
    { month: 0, baseline: 120, totalPopulation: 120 },
    { month: 1, baseline: 120, totalPopulation: 112 },
    { month: 2, baseline: 120, totalPopulation: 105 },
    { month: 3, baseline: 120, totalPopulation: 100 },
    { month: 4, baseline: 120, totalPopulation: 95 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useIsMobile.mockReturnValue(false);
  });

  it("should successfully render chart", () => {
    render(<Chart data={mockData} />);

    expect(Line.mock.calls[0][0].data).toStrictEqual({
      labels: [0, "", "", "", ""],
      datasets: [
        {
          label: "baseline",
          data: [120, 120, 120, 120, 120],
          pointBackgroundColor: [
            BASELINE_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
          ],
          pointBorderColor: [
            BASELINE_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
          ],
          borderWidth: 2,
          borderColor: BASELINE_COLOR,
          backgroundColor: BASELINE_COLOR,
          fill: false,
        },
        {
          label: "totalPopulation",
          data: [120, 112, 105, 100, 95],
          pointBackgroundColor: [
            TOTAL_POPULATION_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
          ],
          pointBorderColor: [
            TOTAL_POPULATION_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
            TRANSPARENT_COLOR,
          ],
          borderWidth: 2,
          borderColor: TOTAL_POPULATION_COLOR,
          backgroundColor: TOTAL_POPULATION_COLOR,
          fill: false,
        },
      ],
    });
  });

  it("should be responsive", () => {
    useIsMobile.mockReturnValue(true);
    render(<Chart data={mockData} />);

    expect(Line.mock.calls[0][0].data).toMatchObject({
      datasets: [
        {
          borderWidth: 1,
        },
        {
          borderWidth: 1,
        },
      ],
    });

    expect(Line.mock.calls[0][0].options).toMatchObject({
      scales: { yAxes: [{ ticks: { fontSize: 12 } }] },
    });
  });

  it("should show every 12'th tooltip", () => {
    render(<Chart data={mockData} />);

    expect(Line.mock.calls[0][0].options.tooltips.filter({ index: 0 })).toBe(true);
    expect(Line.mock.calls[0][0].options.tooltips.filter({ index: 12 })).toBe(true);
    expect(Line.mock.calls[0][0].options.tooltips.filter({ index: 11 })).toBe(false);
    expect(Line.mock.calls[0][0].options.tooltips.filter({ index: 13 })).toBe(false);
  });

  it("should show diff in people in tooltips title", () => {
    render(<Chart data={mockData} />);

    expect(
      Line.mock.calls[0][0].options.tooltips.callbacks.title([{ value: 10 }, { value: 20 }])
    ).toBe("10 people");
    expect(
      Line.mock.calls[0][0].options.tooltips.callbacks.title([{ value: 238 }, { value: 500 }])
    ).toBe("262 people");
  });

  it("should show year in tooltips footer", () => {
    render(<Chart data={mockData} />);

    expect(Line.mock.calls[0][0].options.tooltips.callbacks.footer([{ label: 1 }])).toBe("1 year");
    expect(Line.mock.calls[0][0].options.tooltips.callbacks.footer([{ label: 2 }])).toBe("2 years");
  });

  it("should show labels in tooltip", () => {
    render(<Chart data={mockData} />);

    expect(Line.mock.calls[0][0].options.tooltips.callbacks.label()).toBe(null);
  });

  it("should draw line that connects 2 charts", () => {
    const mockFirstPoint = {
      _index: 0,
      _model: {
        x: 0,
        y: 1,
      },
    };

    const mockSecondPoint = {
      _index: 0,
      _model: {
        x: 0,
        y: 8,
      },
    };

    const mockChart = {
      tooltip: { _active: ["some tooltip"] },
      controller: { tooltip: { _active: [mockFirstPoint, mockSecondPoint] } },
      ctx: {
        save: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        setLineDash: jest.fn(),
        lineWidth: "some line width",
        strokeStyle: "some stroke style",
        stroke: jest.fn(),
        restore: jest.fn(),
      },
    };
    render(<Chart data={mockData} />);

    const drawLinePlugin = Line.mock.calls[0][0].plugins[0];
    drawLinePlugin.afterDraw(mockChart);

    expect(mockChart.ctx.save).toHaveBeenCalled();
    expect(mockChart.ctx.beginPath).toHaveBeenCalled();
    expect(mockChart.ctx.moveTo).toHaveBeenCalled();
    expect(mockChart.ctx.lineTo).toHaveBeenCalled();
    expect(mockChart.ctx.lineWidth).toBe(1);
    expect(mockChart.ctx.strokeStyle).toBe(CONNECTING_LINE_COLOR);
    expect(mockChart.ctx.setLineDash).toHaveBeenCalled();
    expect(mockChart.ctx.stroke).toHaveBeenCalled();
    expect(mockChart.ctx.restore).toHaveBeenCalled();
  });

  it("should not draw line that connects 2 charts when no active tooltips", () => {
    const mockChart = {
      tooltip: { _active: [] },
    };
    render(<Chart data={mockData} />);

    const drawLinePlugin = Line.mock.calls[0][0].plugins[0];

    drawLinePlugin.afterDraw(mockChart);
  });

  it("should draw line only for every 12'th tooltip", () => {
    const mockFirstPoint = {
      _index: 6,
      _model: {
        x: 0,
        y: 1,
      },
    };

    const mockSecondPoint = {
      _index: 7,
      _model: {
        x: 0,
        y: 8,
      },
    };

    const mockChart = {
      tooltip: { _active: ["some tooltip"] },
      controller: { tooltip: { _active: [mockFirstPoint, mockSecondPoint] } },
    };
    render(<Chart data={mockData} />);

    const drawLinePlugin = Line.mock.calls[0][0].plugins[0];

    drawLinePlugin.afterDraw(mockChart);
  });

  it("should not draw line if y's are same", () => {
    const mockFirstPoint = {
      _index: 12,
      _model: {
        x: 0,
        y: 2,
      },
    };

    const mockSecondPoint = {
      _index: 12,
      _model: {
        x: 0,
        y: 2,
      },
    };

    const mockChart = {
      tooltip: { _active: ["some tooltip"] },
      controller: { tooltip: { _active: [mockFirstPoint, mockSecondPoint] } },
    };

    render(<Chart data={mockData} />);

    const drawLinePlugin = Line.mock.calls[0][0].plugins[0];

    drawLinePlugin.afterDraw(mockChart);
  });

  it("should not render chart if isError = true", () => {
    render(<Chart isError data={[]} />);

    expect(Line).toHaveBeenCalledTimes(0);
  });

  it("should format y axis", () => {
    render(<Chart data={mockData} />);

    expect(Line.mock.calls[0][0].options.scales.yAxes[0].ticks.callback(140299588)).toBe(
      "140,299,588"
    );
  });
});
