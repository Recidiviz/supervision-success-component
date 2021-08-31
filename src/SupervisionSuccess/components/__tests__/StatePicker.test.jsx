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
import Picker from "../Picker";

jest.mock("../Picker");

describe("StatePicker tests", () => {
  const mockState1 = "Texas";
  const mockState2 = "Alabama";
  const mockYear = 2019;
  const mockStates = [mockState1, mockState2];
  const mockOnStateChange = jest.fn();

  Picker.mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully render", () => {
    const { getByText } = render(
      <StatePicker
        year={mockYear}
        states={mockStates}
        state={mockState1}
        onStateChange={mockOnStateChange}
        isNotAvailable2020={false}
      />
    );

    expect(
      getByText((content, node) => {
        const hasText = (node) => node.textContent === "Based on Texas data from 2019, 2020";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));

        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
    expect(Picker).toBeCalled();

    Picker.mock.calls[0][0].onChange({ value: mockState2 });

    expect(mockOnStateChange).toHaveBeenCalledWith(mockState2);
    expect(Picker.mock.calls[0][0].options).toStrictEqual([
      {
        label: "Texas",
        value: "Texas",
      },
      {
        label: "Alabama",
        value: "Alabama",
      },
    ]);
  });

  it("should not render 2020 if 2020 data is not available", () => {
    const { getByText } = render(
      <StatePicker
        year={mockYear}
        states={mockStates}
        state={mockState1}
        onStateChange={mockOnStateChange}
        isNotAvailable2020
      />
    );

    expect(
      getByText((content, node) => {
        const hasText = (node) => node.textContent === "Based on Texas data from 2019";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));

        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
    expect(Picker).toBeCalled();

    Picker.mock.calls[0][0].onChange({ value: mockState2 });

    expect(mockOnStateChange).toHaveBeenCalledWith(mockState2);
    expect(Picker.mock.calls[0][0].options).toStrictEqual([
      {
        label: "Texas",
        value: "Texas",
      },
      {
        label: "Alabama",
        value: "Alabama",
      },
    ]);
  });

  it("should render '-' options, state and year options if isError = true", () => {
    const { getByText } = render(
      <StatePicker
        year={mockYear}
        isError
        states={mockStates}
        state={mockState1}
        onStateChange={mockOnStateChange}
        isNotAvailable2020
      />
    );

    expect(Picker).toBeCalled();
    expect(Picker.mock.calls[0][0].options).toStrictEqual([
      {
        label: "-",
        value: "-",
      },
    ]);
    expect(
      getByText((content, node) => {
        const hasText = (node) => node.textContent === "Based on - from -";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));

        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });
});
