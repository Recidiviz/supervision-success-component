import React from "react";
import { act, render } from "@testing-library/react";

import SupervisionSuccess from "../SupervisionSuccess";
import LoadingScreen from "../components/LoadingScreen";
import SupervisionSuccessContainer from "../SupervisionSuccessContainer";
import deriveModelParamsFromCsvString from "../utils/deriveModelParamsFromCsvString";
import { ERROR_NOT_CSV_FETCHED, ERROR_RESPONSE_NOT_OK } from "../constants";

jest.mock("../components/LoadingScreen", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));
jest.mock("../SupervisionSuccessContainer", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(null),
}));
jest.mock("../utils/deriveModelParamsFromCsvString");

describe("SupervisionSuccess tests", () => {
  const mockParams = "some params";
  const mockPath = "/some_path";

  beforeAll(() => {
    jest.spyOn(window, "fetch");
    jest.spyOn(window.console, "log");
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

    deriveModelParamsFromCsvString.mockResolvedValueOnce(mockParams);

    const text = jest.fn().mockResolvedValueOnce(mockCSVString);
    const blob = jest.fn().mockResolvedValueOnce({ text, type: "text/csv" });
    window.fetch.mockResolvedValueOnce({
      blob,
      ok: true,
    });

    await act(async () => {
      render(<SupervisionSuccess path={mockPath} />);
    });

    expect(window.fetch).toBeCalledWith(mockPath);

    expect(SupervisionSuccessContainer.mock.calls[0][0]).toStrictEqual({
      params: mockParams,
      isError: false,
    });
  });

  it("should throw error if response is not OK", async () => {
    window.fetch.mockResolvedValueOnce({ ok: false });

    await act(async () => {
      render(<SupervisionSuccess path={mockPath} />);
    });

    expect(SupervisionSuccessContainer.mock.calls[0][0]).toMatchObject({ isError: true });

    expect(window.console.log).toBeCalledWith(Error(ERROR_RESPONSE_NOT_OK).toString());
  });

  it("should throw error if fetched non-csv file", async () => {
    const blob = jest.fn().mockResolvedValueOnce({ type: "text/html" });
    window.fetch.mockResolvedValueOnce({ ok: true, blob });

    await act(async () => {
      render(<SupervisionSuccess path={mockPath} />);
    });

    expect(SupervisionSuccessContainer.mock.calls[0][0]).toMatchObject({ isError: true });

    expect(window.console.log).toBeCalledWith(Error(ERROR_NOT_CSV_FETCHED).toString());
  });
});
