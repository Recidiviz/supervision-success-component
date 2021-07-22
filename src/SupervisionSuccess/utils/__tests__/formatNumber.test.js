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
import formatNumber from "../formatNumber";

describe("formatNumber.js", () => {
  it("should add commas as thousands separator", () => {
    expect(formatNumber(1)).toBe("1");
    expect(formatNumber(1001)).toBe("1,001");
    expect(formatNumber(10000)).toBe("10,000");
    expect(formatNumber(-10002)).toBe("-10,002");
    expect(formatNumber(20004992888)).toBe("20,004,992,888");
    expect(formatNumber(-0)).toBe("-0");
  });

  it("should round to integer", () => {
    expect(formatNumber(149.49)).toBe("149");
    expect(formatNumber(120.5)).toBe("121");
    expect(formatNumber(9999.5)).toBe("10,000");
  });

  it("should return absolute values", () => {
    expect(formatNumber(-1002, true)).toBe("1,002");
    expect(formatNumber(-0, true)).toBe("0");
    expect(formatNumber(-1, true)).toBe("1");
  });
});
