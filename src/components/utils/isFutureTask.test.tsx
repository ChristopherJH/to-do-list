import { isFutureTask } from "./isFutureTask";

const testTask = {
  id: 2,
  task: "Clean dishes",
  creationdate: "2021-12-02 11:50:18.428736",
  duedate: "2021-12-20 11:50:18.428736",
  completed: false,
};

test("Is a future task by 10 days:", () => {
  expect(isFutureTask(testTask, "December 10, 2021 03:24:00")).toBe(true);
});

test("Is not a future task (only 4 days):", () => {
  expect(isFutureTask(testTask, "December 16, 2021 03:24:00")).toBe(false);
});

test("Is a future task (1 year):", () => {
  expect(isFutureTask(testTask, "December 20, 2020 03:24:00")).toBe(true);
});

test("Is a future task (1 month):", () => {
  expect(isFutureTask(testTask, "November 20, 2021 03:24:00")).toBe(true);
});
