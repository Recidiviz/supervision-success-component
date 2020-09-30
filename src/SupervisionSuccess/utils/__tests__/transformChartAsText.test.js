import transformChartDataToText from "../transformChartAsText";

describe("transformChartAsText tests", () => {
  it("should transform dataset to text", () => {
    const mockDataset = Array.from({ length: 61 }).map((_, index) => 5000 - index * 50);
    expect(transformChartDataToText(mockDataset)).toBe(
      "Initial: 5000 people in prison. After 1st year: 4400. After 2nd year: 3800. After 3rd year: 3200. After 4th year: 2600. After 5th year: 2000."
    );
    expect(transformChartDataToText(mockDataset.slice(0, 37))).toBe(
      "Initial: 5000 people in prison. After 1st year: 4400. After 2nd year: 3800. After 3rd year: 3200."
    );
  });
});
