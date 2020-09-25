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
    render(
      <StatePicker
        year={mockYear}
        states={mockStates}
        state={mockState1}
        onStateChange={mockOnStateChange}
      />
    );

    expect(Picker).toBeCalled();

    const fistCallProps = Picker.mock.calls[0][0];
    fistCallProps.onChange({ value: mockState2 });

    expect(mockOnStateChange).toHaveBeenCalledWith(mockState2);
    expect(fistCallProps.options).toStrictEqual([
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
});
