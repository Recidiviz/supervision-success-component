import csv from "csvtojson";

import deriveModelParamsFromCsvString from "../deriveModelParamsFromCsvString";

jest.mock("csvtojson");

describe("deriveModelParamsFromCsvString tests", () => {
  const mockString = "some string";
  it("should convert csv string to params", () => {
    csv.mockReturnValue({
      fromString: jest.fn().mockReturnValue(
        Promise.resolve([
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
        ])
      ),
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
});
