import windows from "../index.js";
describe("windows", () => {
  test("has a 'createMain' function", () => {
    expect(windows.createMain).toBeDefined();
  });
});
