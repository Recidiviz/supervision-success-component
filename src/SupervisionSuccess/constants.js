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
export const ERROR_RESPONSE_NOT_OK = (response) =>
  `An error happened while attempting to load the params file. Response was: ${response}`;
export const ERROR_NOT_CSV_FETCHED =
  "Could not load the params file, either because the file was not found or it was not of type 'text/csv'";
export const ERROR_NO_ROWS =
  "Parser didn't find any data rows, check the documentation in the readme to see the requirements for file formatting";
