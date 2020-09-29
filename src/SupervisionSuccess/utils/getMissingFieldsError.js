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

/**
 * Function that returns a suitable error message for describing the given list
 * of missing fields (from `params.csv`) for the given state, to be used in
 * logging, throwing errors, etc.
 * @param {string} state - state with the missing fields
 * @param {string[]} fields - list of the names of missing fields for the state
 * @returns {string} - a suitable, readable error message
 */
function getMissingFieldsError(state, fields) {
  const isSingle = fields.length === 1;

  const stateSuffix = fields.includes("state")
    ? "missing for a row without a state name"
    : `missing for state ${state}`;

  return `Field${isSingle ? "" : "s"} ${fields.join(", ")} ${
    isSingle ? "is" : "are"
  } ${stateSuffix}.`;
}

export default getMissingFieldsError;
