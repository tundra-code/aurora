import { removePrefix } from "../util";
import { MutationPrefix } from "../../constants";

test("removePrefix exists", () => {
  expect(removePrefix).toBeDefined();
});

test("removePrefix correctly gets rid of prefix", () => {
  expect(removePrefix(MutationPrefix + "cats")).toBe("cats");
});

test("removePrefix doesn't remove things it shouldn't", () => {
  expect(removePrefix("one")).toBe("one");
});
