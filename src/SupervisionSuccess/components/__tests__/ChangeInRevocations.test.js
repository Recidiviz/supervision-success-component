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
  const mockOnChangeInRevocationsChange = jest.fn();
  ReactSlider.mockReturnValue(null);

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
    const mockThumbProps = { some: "prop" };
    useIsMobile.mockReturnValue(false);

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
});
