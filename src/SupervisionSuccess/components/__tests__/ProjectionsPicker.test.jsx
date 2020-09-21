import React from "react";
import { render } from "@testing-library/react";
import ProjectionsPicker from "../ProjectionsPicker";
import Picker from "../Picker";

jest.mock("../Picker");

describe("ProjectionsPicker tests", () => {
  const mockValue = 0;
  const mockProjections = mockValue;
  const mockOnProjectionsChange = jest.fn();
  const mockLabel = "some label";
  Picker.mockReturnValue(null);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully render", () => {
    render(
      <ProjectionsPicker
        projections={mockProjections}
        onProjectionsChange={mockOnProjectionsChange}
      />
    );

    expect(Picker).toBeCalled();

    const fistCallProps = Picker.mock.calls[0][0];

    fistCallProps.onChange({ value: mockValue });
    expect(mockOnProjectionsChange).toHaveBeenCalledWith(mockValue);
    expect(fistCallProps.formatOptionLabel({ label: mockLabel }, { context: "menu" })).toBe(
      mockLabel
    );
    expect(fistCallProps.formatOptionLabel({ label: mockLabel }, { context: "value" })).toBe(
      `${mockLabel} years`
    );
  });
});
