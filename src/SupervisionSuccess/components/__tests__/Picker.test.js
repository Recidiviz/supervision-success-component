import React from "react";
import ReactSelect from "react-select";
import { render } from "@testing-library/react";
import Picker from "../Picker";

jest.mock("react-select");

describe("Picker tests", () => {
  const mockMenuLabel = "some label";
  const mockOption = { value: "some value", label: "some label" };
  const mockOptions = [mockOption];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pass right props", () => {
    render(
      <Picker
        options={mockOptions}
        menuLabel={mockMenuLabel}
        defaultValue={mockOption}
        onChange={mockOnChange}
      />
    );

    expect(ReactSelect).toBeCalled();
    expect(ReactSelect.mock.calls[0][0].options).toStrictEqual([
      {
        label: mockMenuLabel,
        options: mockOptions,
      },
    ]);
    ReactSelect.mock.calls[0][0].onChange();
    expect(mockOnChange).toHaveBeenCalled();
  });
});
