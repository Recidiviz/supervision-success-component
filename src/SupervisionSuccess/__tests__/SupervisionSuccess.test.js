import React from "react";
import { act, render } from "@testing-library/react";

import SupervisionSuccess from "../SupervisionSuccess";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import SupervisionSuccessContainer from "../SupervisionSuccessContainer";
import convertCSVStringToParams from "../utils/convertCSVStringToParams";
import { CSV_PROCESSING_ERROR } from "../constants";

jest.mock("../components/LoadingScreen", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));
jest.mock("../components/ErrorScreen", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));
jest.mock("../SupervisionSuccessContainer", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));
jest.mock("../utils/convertCSVStringToParams");

describe("SupervisionSuccess tests", () => {
  const mockParams = "some params";
  const mockPath = "/some_path";

  beforeAll(() => {
    jest.spyOn(window, "fetch");
    jest.spyOn(window.console, "error");
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render LoadingScreen while loading", () => {
    render(<SupervisionSuccess path={mockPath} />);

    expect(LoadingScreen).toBeCalled();
  });

  it("should receive and set params after mount", async () => {
    const mockCSVString = "some csv string";

    convertCSVStringToParams.mockResolvedValueOnce(mockParams);

    const text = jest.fn().mockResolvedValueOnce(mockCSVString);
    const blob = jest.fn().mockResolvedValueOnce({ text });
    window.fetch.mockResolvedValueOnce({
      blob,
    });

    await act(async () => {
      render(<SupervisionSuccess path={mockPath} />);
    });

    expect(window.fetch).toBeCalledWith(mockPath);

    expect(SupervisionSuccessContainer.mock.calls[0][0]).toStrictEqual({ params: mockParams });
  });

  it("should show error screen and log the error", async () => {
    const mockError = "some error";
    window.fetch.mockRejectedValueOnce(mockError);

    await act(async () => {
      render(<SupervisionSuccess path={mockPath} />);
    });

    expect(window.fetch).toBeCalledWith(mockPath);

    expect(ErrorScreen.mock.calls[0][0].error).toBe(CSV_PROCESSING_ERROR);
    expect(window.console.error).toBeCalledWith(mockError);
  });
});
