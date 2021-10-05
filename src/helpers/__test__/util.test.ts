import { arrayToString, removeDuplicateArray } from "../util";

it("should successfully make string from array with 1 length", () => {
  const expectedString = "Spider";

  expect(arrayToString(["Spider"])).toBe(expectedString);
});

it("should successfully make string from array with 3 length", () => {
  const expectedString = "Spider, Lion king, Hyena";

  expect(arrayToString(["spider", "lion king", "hyena"])).toBe(expectedString);
});

it("should successfully remove duplicate string from array", () => {
  const expectedArr = ["a", "b", "c", "d"];

  expect(removeDuplicateArray(["a", "b", "b", "c", "d", "d", "d"])).toBe(
    expectedArr
  );
});
