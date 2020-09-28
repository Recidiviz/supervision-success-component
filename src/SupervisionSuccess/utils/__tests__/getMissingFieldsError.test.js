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
import getMissingFieldsError from "../getMissingFieldsError";

describe("getMissingFieldsError", () => {
  it("should return valid value for single item array", () => {
    expect(getMissingFieldsError("California", ["whatever"])).toBe(
      "Field whatever is missing for state California."
    );
  });

  it("should return valid value for multiple items array", () => {
    expect(getMissingFieldsError("California", ["whatever", "another field"])).toBe(
      "Fields whatever, another field are missing for state California."
    );
  });

  it("should return valid value for single item array with undefined state", () => {
    expect(getMissingFieldsError(undefined, ["state"])).toBe(
      "Field state is missing for a row without a state name."
    );
  });

  it("should return valid value for multiple items array with undefined state", () => {
    expect(getMissingFieldsError(undefined, ["state", "whatever", "another field"])).toBe(
      "Fields state, whatever, another field are missing for a row without a state name."
    );
  });
});
