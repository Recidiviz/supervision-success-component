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
});
