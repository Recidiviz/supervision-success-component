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
const params = {
  Alabama: {
    year: 2017,
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
  Alaska: {
    year: 2017,
    newOffensePopulation: 3297,
    revocationsTimescale: 2.694177732,
    revocationA: 151.4067397,
    marginalCostPerInmate: 0.001,
    savingsMap: [
      {
        checkpoint: 439.6,
        savings: 32,
      },
      {
        checkpoint: 293.0666667,
        savings: 21.33333333,
      },
      {
        checkpoint: 219.8,
        savings: 16,
      },
      {
        checkpoint: 87.92,
        savings: 6.4,
      },
    ],
  },
  Texas: {
    year: 2017,
    newOffensePopulation: 120435,
    revocationsTimescale: 9.037426133,
    revocationA: 280.8690545,
    marginalCostPerInmate: 0.001,
    savingsMap: [
      {
        checkpoint: 14337.5,
        savings: 324.375,
      },
      {
        checkpoint: 9558.333333,
        savings: 216.25,
      },
      {
        checkpoint: 7168.75,
        savings: 162.1875,
      },
      {
        checkpoint: 2867.5,
        savings: 64.875,
      },
    ],
  },
};

export default params;
