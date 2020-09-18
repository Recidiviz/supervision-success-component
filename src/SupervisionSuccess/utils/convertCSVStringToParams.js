import csv from "csvtojson";

/**
 * Functions that extracts needed fields from csv and transforms to params object
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
async function convertCSVStringToParams(string) {
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
      const checkpointNumbers = Object.keys(row)
        .filter((key) => key.startsWith("checkpoint"))
        .map((checkpoint) => checkpoint.replace("checkpoint", ""));

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

export default convertCSVStringToParams;
