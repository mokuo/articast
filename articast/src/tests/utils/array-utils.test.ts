import { chunk } from "../../utils/array-utils";

describe("chunk()", () => {
  test.each([
    {
      array: ["a", "b", "c", "d"],
      size: 2,
      expected: [
        ["a", "b"],
        ["c", "d"],
      ],
    },
    {
      array: ["a", "b", "c", "d"],
      size: 3,
      expected: [["a", "b", "c"], ["d"]],
    },
  ])("chunk($array, $size)", ({ array, size, expected }) => {
    expect(chunk(array, size)).toEqual(expected);
  });
});
