// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
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
 * Function that formats numbers to integers and returns absolute number if needed
 * @param {number} number - any incoming value
 * @param {boolean} isAbsolute - absolute flag
 * @returns {string} - formatted number
 * 1245.52 -> "1246"
 * 55.592  -> "56"
 * -6.29305 -> "6"
 */
const formatNumber = (number, isAbsolute = false) => {
  let formattedNumber = number;
  if (isAbsolute) {
    formattedNumber = Math.abs(formattedNumber);
  }

  return Math.round(formattedNumber).toLocaleString("en-US");
};

export default formatNumber;
