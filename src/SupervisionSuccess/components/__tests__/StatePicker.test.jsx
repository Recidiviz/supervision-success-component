import React from "react";
import { render } from "@testing-library/react";

import StatePicker from "../StatePicker";
import Picker from "../Picker";

jest.mock("../Picker");

describe("StatePicker tests", () => {
  const mockState1 = "Texas";
  const mockState2 = "Alabama";
  const mockYear = 2017;
  const mockStates = [mockState1, mockState2];
  const mockOnStateChange = jest.fn();

  Picker.mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully render", () => {
    const { getByText } = render(
      <StatePicker year={mockYear} states={mockStates} state={mockState1} onStateChange={mockOnStateChange} />
    );

    expect(getByText("Based on Texas data from 2017")).toBeInTheDocument();
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
        isError
        states={mockStates}
        state={mockState1}
        onStateChange={mockOnStateChange}
      />
    );

    expect(Picker).toBeCalled();
    expect(Picker.mock.calls[0][0].options).toStrictEqual([
      {
        label: "-",
        value: "-",
      },
    ]);
    expect(getByText("Based on - data from -")).toBeInTheDocument();
  });
});
