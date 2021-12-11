import { getDate } from "./getDate";

// Double digit day
test("17th Dec 1995 test:", () => {
  expect(getDate(0, "December 17, 1995 03:24:00")).toBe("1995-12-17");
});

// Single digit day
test("9th Feb 2021 test:", () => {
  expect(getDate(0, "February 9, 2021 03:24:00")).toBe("2021-2-09");
});
