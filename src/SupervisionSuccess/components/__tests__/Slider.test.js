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
import ReactSlider from "react-slider";
import { render } from "@testing-library/react";

import Slider from "../Slider";

jest.mock("react-slider");

describe("Slider tests", () => {
  const mockTitle = "Change in revocations";
  const mockHint = "Violations resulting in Alabama incarceration";
  const mockFinalValue = 350;
  const mockChangeValue = 50;
  const mockThumbProps = { some: "prop" };
  const mockOnChangeValueChange = jest.fn();
  ReactSlider.mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without error", () => {
    render(
      <Slider
        title={mockTitle}
        hint={mockHint}
        finalValue={mockFinalValue}
        changeValue={mockChangeValue}
        onChangeValueChange={mockOnChangeValueChange}
      />
    );
  });

  it("should render thumb", () => {
    render(
      <Slider
        title={mockTitle}
        hint={mockHint}
        finalValue={mockFinalValue}
        changeValue={mockChangeValue}
        onChangeValueChange={mockOnChangeValueChange}
      />
    );

    const { getByText } = render(ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps));
    expect(getByText(`${mockChangeValue.toString()}%`)).toBeInTheDocument();
    expect(getByText(mockFinalValue.toString())).toBeInTheDocument();
    expect(getByText("Violations resulting in Alabama incarceration")).toBeInTheDocument();
  });

  it("should render thumb without data if isError = true", () => {
    render(
      <Slider
        isError
        title={mockTitle}
        hint={mockHint}
        finalValue={mockFinalValue}
        changeValue={mockChangeValue}
        onChangeValueChange={mockOnChangeValueChange}
      />
    );

    const { findAllByText } = render(ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps));
    expect(findAllByText("-")).resolves.toHaveLength(2);
  });

  it("should be responsive", () => {
    const { container } = render(
      <Slider
        title={mockTitle}
        hint={mockHint}
        finalValue={mockFinalValue}
        changeValue={mockChangeValue}
        onChangeValueChange={mockOnChangeValueChange}
      />
    );
    const { container: thumbContainer } = render(
      ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps)
    );

    expect(ReactSlider).toHaveBeenCalledTimes(1);
    expect(ReactSlider.mock.calls[0][0].orientation).toBe("horizontal");
    expect(container.querySelector(".slider_info")).not.toBeNull();
    expect(thumbContainer.querySelector(".slider_thumb")).not.toBeNull();
    expect(thumbContainer.querySelector(".slider_thumb").childNodes.length).toBe(0);
  });
});
