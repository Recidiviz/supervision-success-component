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
import csv from "csvtojson";

import deriveModelParamsFromCsvString from "../deriveModelParamsFromCsvString";
import getMissingFieldsError from "../getMissingFieldsError";
import { ERROR_NO_ROWS } from "../../constants";

jest.mock("csvtojson");
jest.mock("../getMissingFieldsError");

describe("deriveModelParamsFromCsvString tests", () => {
  const mockFieldsError = "some fields missing error";
  const mockString = "some string";

  beforeAll(() => {
    getMissingFieldsError.mockReturnValue(mockFieldsError);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should convert csv string to params", () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([
        {
          state: "Alabama",
          year: "2017",
          newOffensePopulation: "32928",
          revocationsTimescale: "2.258190983",
          revocationA: "131.7795242",
          marginalCostPerInmate: "0.001",
          totalCostPerInmate: "0.01785714286",
          numberOfFacilities: "10",
          stateWideCapacity: "33600",
        },
      ]),
    });

    expect(deriveModelParamsFromCsvString(mockString)).resolves.toStrictEqual({
      Alabama: {
        newOffensePopulation: 32928,
        revocationsTimescale: 2.258190983,
        revocationA: 131.7795242,
        marginalCostPerInmate: 0.001,
        year: 2017,
        totalCostPerInmate: 0.01785714286,
        numberOfFacilities: 10,
        stateWideCapacity: 33600,
      },
    });
  });

  it("should throw error if state is missing", async () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([
        {
          year: "2017",
          newOffensePopulation: "32928",
          revocationsTimescale: "2.258190983",
          revocationA: "131.7795242",
          marginalCostPerInmate: "0.001",
          totalCostPerInmate: "0.01785714286",
          numberOfFacilities: "10",
          stateWideCapacity: "33600",
        },
      ]),
    });

    await expect(deriveModelParamsFromCsvString(mockString)).rejects.toThrowError(
      Error(mockFieldsError)
    );
    expect(getMissingFieldsError).toHaveBeenCalledWith(undefined, ["state"]);
  });

  it("should throw error if there are multiple missing fields", async () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([
        {
          totalCostPerInmate: "0.01785714286",
          numberOfFacilities: "10",
          stateWideCapacity: "33600",
        },
      ]),
    });

    await expect(deriveModelParamsFromCsvString(mockString)).rejects.toThrowError(
      Error(mockFieldsError)
    );
    expect(getMissingFieldsError).toHaveBeenCalledWith(undefined, [
      "state",
      "year",
      "newOffensePopulation",
      "revocationA",
      "revocationsTimescale",
      "marginalCostPerInmate",
    ]);
  });

  it("should throw error if no data", () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([]),
    });

    expect(deriveModelParamsFromCsvString(mockString)).rejects.toThrowError(Error(ERROR_NO_ROWS));
  });
});
