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
import { ERROR_NO_ROWS } from "../constants";
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
 *   totalCostPerInmate: number
 *   numberOfFacilities: number
 *   stateWideCapacity: number
 * }>>}
 */
async function deriveModelParamsFromCsvString(string) {
  const json = await csv({
    noheader: false,
    headers: [
      "state",
      "year",
      "revocationsPopulation",
      "populationFraction",
      "revocationsAdmissions",
      "admissionsFraction",
      "totalCostPerInmate",
      "marginalCostPerInmate",
      "numberOfFacilities",
      "stateWideCapacity",
      "totalPopulation",
      "newOffensePopulation",
      "totalAdmissions",
      "newOffenseAdmissions",
      "newOffenseAvgTimeServedInMonths",
      "revocationsTimescale",
      "newOffenseA",
      "revocationA",
    ],
  }).fromString(string);

  if (!json.length) {
    throw new Error(ERROR_NO_ROWS);
  }

  return json.reduce(
    (
      params,
      {
        state,
        year,
        newOffensePopulation,
        revocationA,
        revocationsTimescale,
        marginalCostPerInmate,
        totalCostPerInmate,
        numberOfFacilities,
        stateWideCapacity,
      }
    ) => {
      const requiredFields = {
        state,
        year,
        newOffensePopulation,
        revocationA,
        revocationsTimescale,
        marginalCostPerInmate,
        totalCostPerInmate,
        numberOfFacilities,
        stateWideCapacity,
      };
      const missingFields = Object.keys(requiredFields).filter(
        (key) => typeof requiredFields[key] !== "string" || requiredFields[key].length === 0
      );

      if (missingFields.length) {
        throw new Error(getMissingFieldsError(state, missingFields));
      }

      return {
        ...params,
        [state]: {
          newOffensePopulation: Number(newOffensePopulation),
          revocationA: Number(revocationA),
          revocationsTimescale: Number(revocationsTimescale),
          marginalCostPerInmate: Number(marginalCostPerInmate),
          year: Number(year),
          totalCostPerInmate: Number(totalCostPerInmate),
          numberOfFacilities: Number(numberOfFacilities),
          stateWideCapacity: Number(stateWideCapacity),
        },
      };
    },
    {}
  );
}

export default deriveModelParamsFromCsvString;
