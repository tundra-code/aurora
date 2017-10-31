import mutations from "../mutations";

describe("mutations", () => {
  test("it has a mutations path", () => {
    expect(mutations.mutationsPath).toBeDefined();
  });

  test("it has a list of default mutations", () => {
    expect(mutations.defaultMutations).toBeDefined();
  });
});
