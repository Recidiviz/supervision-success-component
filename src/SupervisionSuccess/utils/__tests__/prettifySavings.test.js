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
import prettifySavings from "../prettifySavings";

describe("prettifySavings tests", () => {
  it("should return integer when number in [-∞; ∞]", () => {
    expect(prettifySavings(1005.3525235235235)).toBe("$1005M");
    expect(prettifySavings(100.924)).toBe("$101M");
  });

  it("should return sum in thousands when number in (-1; 1)", () => {
    expect(prettifySavings(-0.4125216)).toBe("$413k");
    expect(prettifySavings(0.5500000001)).toBe("$550k");
  });
});
