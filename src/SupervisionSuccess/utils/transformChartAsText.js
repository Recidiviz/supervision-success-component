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
 * Function that returns a message for screen readers that describes the data
 * in the revocations over time chart, for accessibility purposes.
 * @param {Object[]} dataset - the dataset used to visualize data in the chart
 * @returns {string} - a descriptive message to be used for accessibility
 */
const transformChartDataToText = (dataset) => {
  let result = `Initial: ${dataset[0]} people in prison.`;
  if (dataset[12]) result += ` After 1st year: ${dataset[12]}.`;
  if (dataset[24]) result += ` After 2nd year: ${dataset[24]}.`;
  if (dataset[36]) result += ` After 3rd year: ${dataset[36]}.`;
  if (dataset[48]) result += ` After 4th year: ${dataset[48]}.`;
  if (dataset[60]) result += ` After 5th year: ${dataset[60]}.`;

  return result;
};

export default transformChartDataToText;
