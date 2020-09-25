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
