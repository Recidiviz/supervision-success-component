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
import ImplementationPeriodPicker from "../ImplementationPeriodPicker";
import Picker from "../Picker";

jest.mock("../Picker");

describe("ImplementationPeriodPicker tests", () => {
  const mockValue = 4;
  const mockImplementationPeriod = mockValue;
  const mockOnImplementationPeriodChange = jest.fn();
  const mockLabel = "some label";
  Picker.mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully render", () => {
    render(
      <ImplementationPeriodPicker
        onImplementationPeriodChange={mockOnImplementationPeriodChange}
        implementationPeriod={mockImplementationPeriod}
      />
    );

    expect(Picker).toBeCalled();

    const fistCallProps = Picker.mock.calls[0][0];

    fistCallProps.onChange({ value: mockValue });
    expect(mockOnImplementationPeriodChange).toHaveBeenCalledWith(mockValue);
    expect(fistCallProps.formatOptionLabel({ label: mockLabel }, { context: "menu" })).toBe(
      mockLabel
    );
    expect(fistCallProps.formatOptionLabel({ label: mockLabel }, { context: "value" })).toBe(
      `${mockLabel} months`
    );
  });

  it("should successfully render tooltip", () => {
    const { container } = render(
      <ImplementationPeriodPicker
        onImplementationPeriodChange={mockOnImplementationPeriodChange}
        implementationPeriod={mockImplementationPeriod}
      />
    );

    expect(container.querySelector(".implementation-period-picker_tooltip")).toBeInTheDocument();
  });
});
