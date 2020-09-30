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

import ChangeInRevocations from "../ChangeInRevocations";
import useIsMobile from "../../utils/useIsMobile";

jest.mock("react-slider");
jest.mock("../../utils/useIsMobile");

describe("ChangeInRevocations tests", () => {
  const mockState = "Texas";
  const mockFinalRevocations = 350;
  const mockChangeInRevocations = 50;
  const mockThumbProps = { some: "prop" };
  const mockOnChangeInRevocationsChange = jest.fn();
  ReactSlider.mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
    useIsMobile.mockReturnValue(false);
  });

  it("should render without error", () => {
    render(
      <ChangeInRevocations
        state={mockState}
        finalRevocations={mockFinalRevocations}
        changeInRevocations={mockChangeInRevocations}
        onChangeInRevocationsChange={mockOnChangeInRevocationsChange}
      />
    );
  });

  it("should render thumb", () => {
    render(
      <ChangeInRevocations
        state={mockState}
        finalRevocations={mockFinalRevocations}
        changeInRevocations={mockChangeInRevocations}
        onChangeInRevocationsChange={mockOnChangeInRevocationsChange}
      />
    );

    const { getByText } = render(ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps));
    expect(getByText(`${mockChangeInRevocations.toString()}%`)).toBeInTheDocument();
    expect(getByText(mockFinalRevocations.toString())).toBeInTheDocument();
    expect(getByText("Violations resulting in Texas incarceration")).toBeInTheDocument();
  });

  it("should render thumb without data if isError = true", () => {
    render(
      <ChangeInRevocations
        isError
        state={mockState}
        finalRevocations={mockFinalRevocations}
        changeInRevocations={mockChangeInRevocations}
        onChangeInRevocationsChange={mockOnChangeInRevocationsChange}
      />
    );

    const { findAllByText, getByText } = render(
      ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps)
    );
    expect(findAllByText("-")).resolves.toHaveLength(2);
    expect(getByText("Violations resulting in - incarceration")).toBeInTheDocument();
  });

  it("should be responsive", () => {
    useIsMobile.mockReturnValue(true);
    const { container } = render(
      <ChangeInRevocations
        state={mockState}
        finalRevocations={mockFinalRevocations}
        changeInRevocations={mockChangeInRevocations}
        onChangeInRevocationsChange={mockOnChangeInRevocationsChange}
      />
    );
    const { container: thumbContainer } = render(
      ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps)
    );

    expect(ReactSlider).toHaveBeenCalledTimes(1);
    expect(ReactSlider.mock.calls[0][0].orientation).toBe("horizontal");
    expect(container.querySelector(".revocations-slider_footer")).not.toBeNull();
    expect(thumbContainer.querySelector(".revocations-slider_thumb")).not.toBeNull();
    expect(thumbContainer.querySelector(".revocations-slider_thumb").childNodes.length).toBe(0);
  });
});
