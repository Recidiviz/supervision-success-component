import getMissingFieldsError from "../getMissingFieldsError";

describe("getMissingFieldsError", () => {
  it("should return valid value for single item array", () => {
    expect(getMissingFieldsError(["state"])).toBe("Field state is missing.");
  });

  it("should return valid value for multiple items array", () => {
    expect(getMissingFieldsError(["state", "another field"])).toBe(
      "Fields state, another field are missing."
    );
  });
});
