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
    const mockResponse = "some response";
    const text = jest.fn().mockResolvedValue(mockResponse);
    window.fetch.mockResolvedValueOnce({ ok: false, text });

    await act(async () => {
      render(<SupervisionSuccess path={mockPath} />);
    });

    expect(SupervisionSuccessContainer.mock.calls[0][0]).toMatchObject({ isError: true });

    expect(window.console.log).toBeCalledWith(
      Error(ERROR_RESPONSE_NOT_OK(mockResponse)).toString()
    );
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
