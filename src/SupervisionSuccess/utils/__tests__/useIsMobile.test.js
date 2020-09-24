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
