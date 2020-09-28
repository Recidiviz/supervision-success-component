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
import { renderHook, act } from "@testing-library/react-hooks";
import useIsMobile from "../useIsMobile";

describe("useIsMobile tests", () => {
  it("should return true if innerWidth < 1024, and change value on resize", () => {
    const map = {};
    jest.spyOn(window, "addEventListener").mockImplementation((event, cb) => {
      map[event] = cb;
    });
    jest.spyOn(window, "removeEventListener").mockImplementation((event) => {
      delete map[event];
    });
    window.innerWidth = 1023;
    const { result, unmount } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);

    window.innerWidth = 1024;
    act(() => {
      map.resize();
    });

    expect(result.current).toBe(false);

    act(() => {
      unmount();
    });

    expect(map.resize).toBe(undefined);
  });
});
