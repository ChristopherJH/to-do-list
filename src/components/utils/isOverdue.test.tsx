import { isOverdue } from "./isOverdue";

const testTask = {
  id: 2,
  task: "Clean dishes",
  creationdate: "2021-12-02 11:50:18.428736",
  duedate: "2021-12-20 11:50:18.428736",
  completed: false,
};

test("Is overdue (1 year):", () => {
  expect(isOverdue(testTask, "December 20, 2022 03:24:00")).toBe(true);
});

test("Is overdue (1 month):", () => {
  expect(isOverdue(testTask, "January 20, 2022 03:24:00")).toBe(true);
});

test("Is not yet overdue (1 month):", () => {
  expect(isOverdue(testTask, "November 20, 2021 03:24:00")).toBe(false);
});

test("Is not yet overdue (1 year):", () => {
  expect(isOverdue(testTask, "December 20, 2020 03:24:00")).toBe(false);
});
