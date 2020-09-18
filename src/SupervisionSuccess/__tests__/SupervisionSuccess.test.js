import React from "react";
import { act, render } from "@testing-library/react";

import SupervisionSuccess from "../SupervisionSuccess";
import LoadingScreen from "../components/LoadingScreen";
import SupervisionSuccessContainer from "../SupervisionSuccessContainer";
import convertCSVStringToParams from "../utils/convertCSVStringToParams";

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
  const mockPath = "some path";

  beforeAll(() => {
    jest.spyOn(window, "fetch");
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
    const targetPromise = Promise.resolve(mockParams);
    convertCSVStringToParams.mockReturnValue(targetPromise);

    const text = async () => mockCSVString;
    const blob = async () => ({ text });
    window.fetch.mockResolvedValueOnce({
      blob,
    });

    render(<SupervisionSuccess path={mockPath} />);

    expect(window.fetch).toBeCalledWith(mockPath);

    await act(() => targetPromise);

    expect(SupervisionSuccessContainer.mock.calls[0][0]).toStrictEqual({ params: mockParams });
  });
});
