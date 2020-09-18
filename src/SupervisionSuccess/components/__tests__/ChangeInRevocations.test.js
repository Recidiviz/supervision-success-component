import React from "react";
import { render } from "@testing-library/react";
import ReactSlider from "react-slider";

import ChangeInRevocations from "../ChangeInRevocations";

jest.mock("react-slider");

describe("ChangeInRevocations tests", () => {
  const mockState = "Texas";
  const mockFinalPopulation = 12000;
  const mockChangeInRevocations = 50;
  const mockOnChangeInRevocationsChange = jest.fn();
  ReactSlider.mockReturnValue(null);

  it("should render without error", () => {
    render(
      <ChangeInRevocations
        state={mockState}
        finalPopulation={mockFinalPopulation}
        changeInRevocations={mockChangeInRevocations}
        onChangeInRevocationsChange={mockOnChangeInRevocationsChange}
      />
    );
  });

  it("should render thumb", () => {
    const mockThumbProps = { some: "prop" };
    const mockThumbState = { valueNow: -40 };

    render(
      <ChangeInRevocations
        state={mockState}
        finalPopulation={mockFinalPopulation}
        changeInRevocations={mockChangeInRevocations}
        onChangeInRevocationsChange={mockOnChangeInRevocationsChange}
      />
    );

    const { getByText } = render(
      ReactSlider.mock.calls[0][0].renderThumb(mockThumbProps, mockThumbState)
    );
    expect(getByText("-40%")).toBeInTheDocument();
    expect(getByText("12000")).toBeInTheDocument();
    expect(getByText("Violations resulting in Texas incarceration")).toBeInTheDocument();
  });
});
