import csv from "csvtojson";
import { ERROR_CHECKPOINTS } from "../constants";
import getMissingFieldsError from "./getMissingFieldsError";

/**
 * Function that extracts needed fields from the given CSV string and transforms
 * them into parameters ready to be fed into the revocations model.
 * @param string - string representation of csv file
 * @returns {Promise<Object.<string, {
 *   newOffensePopulation: number
 *   revocationA: number
 *   revocationsTimescale: number
 *   marginalCostPerInmate: number
 *   savingsMap: {
 *     checkpoint: number
 *     savings: number
 *   }[]
 * }>>}
 */
async function deriveModelParamsFromCsvString(string) {
  const json = await csv().fromString(string);

  return json.reduce(
    (
      params,
      {
        state,
        newOffensePopulation,
        revocationA,
        revocationsTimescale,
        marginalCostPerInmate,
        ...row
      }
    ) => {
      const requiredFields = {
        state,
        newOffensePopulation,
        revocationA,
        revocationsTimescale,
        marginalCostPerInmate,
      };
      const missingFields = Object.keys(requiredFields).filter(
        (key) => typeof requiredFields[key] !== "string"
      );

      if (missingFields.length) {
        throw new Error(getMissingFieldsError(missingFields));
      }

      const checkpointNumbers = Object.keys(row)
        .filter((key) => key.startsWith("checkpoint"))
        .map((checkpoint) => checkpoint.replace("checkpoint", ""));

      if (checkpointNumbers.some((checkpointNumber) => !row[`savings${checkpointNumber}`])) {
        throw new Error(ERROR_CHECKPOINTS);
      }

      const savingsMap = checkpointNumbers
        .map((checkpointNumber) => ({
          checkpoint: Number(row[`checkpoint${checkpointNumber}`]),
          savings: Number(row[`savings${checkpointNumber}`]),
        }))
        .sort((a, b) => b.checkpoint - a.checkpoint);

      return {
        ...params,
        [state]: {
          newOffensePopulation: Number(newOffensePopulation),
          revocationA: Number(revocationA),
          revocationsTimescale: Number(revocationsTimescale),
          marginalCostPerInmate: Number(marginalCostPerInmate),
          savingsMap,
        },
      };
    },
    {}
  );
}

export default deriveModelParamsFromCsvString;
