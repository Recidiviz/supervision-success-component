import csv from "csvtojson";

import deriveModelParamsFromCsvString from "../deriveModelParamsFromCsvString";
import getMissingFieldsError from "../getMissingFieldsError";
import { ERROR_CHECKPOINTS } from "../../constants";

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
          newOffensePopulation: "32928",
          revocationsTimescale: "2.258190983",
          revocationA: "131.7795242",
          marginalCostPerInmate: "0.001",
          checkpoint2: "2240",
          savings2: "40",
          checkpoint1: "3360",
          savings1: "60",
          checkpoint3: "1680",
          savings3: "30",
          checkpoint4: "672",
          savings4: "12",
        },
      ]),
    });

    expect(deriveModelParamsFromCsvString(mockString)).resolves.toStrictEqual({
      Alabama: {
        newOffensePopulation: 32928,
        revocationsTimescale: 2.258190983,
        revocationA: 131.7795242,
        marginalCostPerInmate: 0.001,
        savingsMap: [
          {
            checkpoint: 3360,
            savings: 60,
          },
          {
            checkpoint: 2240,
            savings: 40,
          },
          {
            checkpoint: 1680,
            savings: 30,
          },
          {
            checkpoint: 672,
            savings: 12,
          },
        ],
      },
    });
  });

  it("should throw error if state is missing", async () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([
        {
          newOffensePopulation: "32928",
          revocationsTimescale: "2.258190983",
          revocationA: "131.7795242",
          marginalCostPerInmate: "0.001",
          checkpoint2: "2240",
          savings2: "40",
          checkpoint1: "3360",
          savings1: "60",
          checkpoint3: "1680",
          savings3: "30",
          checkpoint4: "672",
          savings4: "12",
        },
      ]),
    });

    await expect(deriveModelParamsFromCsvString(mockString)).rejects.toThrowError(
      Error(mockFieldsError)
    );
    expect(getMissingFieldsError).toHaveBeenCalledWith(["state"]);
  });

  it("should throw error if there are multiple missing fields", async () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([
        {
          checkpoint2: "2240",
          savings2: "40",
          checkpoint1: "3360",
          savings1: "60",
          checkpoint3: "1680",
          savings3: "30",
          checkpoint4: "672",
          savings4: "12",
        },
      ]),
    });

    await expect(deriveModelParamsFromCsvString(mockString)).rejects.toThrowError(
      Error(mockFieldsError)
    );
    expect(getMissingFieldsError).toHaveBeenCalledWith([
      "state",
      "newOffensePopulation",
      "revocationA",
      "revocationsTimescale",
      "marginalCostPerInmate",
    ]);
  });

  it("should throw error if checkpoints and savings do not match", () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockResolvedValue([
        {
          state: "some state",
          newOffensePopulation: "32928",
          revocationsTimescale: "2.258190983",
          revocationA: "131.7795242",
          marginalCostPerInmate: "0.001",
          checkpoint2: "2240",
          savings7: "40",
          checkpoint1: "3360",
          savings1: "60",
          checkpoint3: "1680",
          savings3: "30",
          checkpoint4: "672",
          savings4: "12",
        },
      ]),
    });

    expect(deriveModelParamsFromCsvString(mockString)).rejects.toThrowError(
      Error(ERROR_CHECKPOINTS)
    );
  });
});
