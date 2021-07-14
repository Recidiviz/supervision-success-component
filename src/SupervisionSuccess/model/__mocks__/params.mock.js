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
    year: 2019,
    newOffensePopulation: 32928,
    revocationsTimescale: 2.258190983,
    revocationA: 131.7795242,
    newOffenseA: 14.64216936,
    NAlpha0: 1.810459121,
    RAlpha0: 0.4067641022,
    newOffenseAvgTimeServedInMonths: 47.42201064,
    marginalCostPerInmate: 0.001,
    totalCostPerInmate: 0.01785714286,
    numberOfFacilities: 10,
    stateWideCapacity: 33600,
  },
  Alaska: {
    year: 2019,
    newOffensePopulation: 3297,
    revocationsTimescale: 2.694177732,
    revocationA: 151.4067397,
    marginalCostPerInmate: 0.001,
    totalCostPerInmate: 0.07279344859,
    numberOfFacilities: 10,
    stateWideCapacity: 4396,
  },
  Texas: {
    year: 2019,
    newOffensePopulation: 120435,
    revocationsTimescale: 9.037426133,
    revocationA: 280.8690545,
    marginalCostPerInmate: 0.001,
    totalCostPerInmate: 0.02262423714,
    numberOfFacilities: 20,
    stateWideCapacity: 143375,
  },
};

export default params;
