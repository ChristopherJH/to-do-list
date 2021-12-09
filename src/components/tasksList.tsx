import { ToDoProps } from "../App";
import { ToDoItemCard } from "./todoCard";

interface UncompletedTaskProps {
  toDoItems: ToDoProps[];
  setRefresh: (input: boolean) => void;
}

// Function that returns lists of uncompleted tasks
export function UncompletedTasks(props: UncompletedTaskProps): JSX.Element {
  const uncompletedItems = props.toDoItems.filter((item) => !item.completed);
  const today = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="todo-list">
      <OverdueOrFutureTasks
        tasks={uncompletedItems}
        taskType={"overdue"}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(0)}
        dayDescription={"Today"}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(1)}
        dayDescription={"Tomorrow"}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(2)}
        dayDescription={weekdays[(today.getDay() + 2) % 7]}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(3)}
        dayDescription={weekdays[(today.getDay() + 3) % 7]}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(4)}
        dayDescription={weekdays[(today.getDay() + 4) % 7]}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(5)}
        dayDescription={weekdays[(today.getDay() + 5) % 7]}
        setRefresh={props.setRefresh}
      />
      <DailyTasks
        tasks={uncompletedItems}
        desiredDate={getDate(6)}
        dayDescription={weekdays[(today.getDay() + 6) % 7]}
        setRefresh={props.setRefresh}
      />
      <GeneralTasks tasks={uncompletedItems} setRefresh={props.setRefresh} />
      <OverdueOrFutureTasks
        tasks={uncompletedItems}
        taskType={"future"}
        setRefresh={props.setRefresh}
      />
    </div>
  );
}

interface OverdueOrFutureTasksProps {
  tasks: ToDoProps[];
  taskType: string;
  setRefresh: (input: boolean) => void;
}

function OverdueOrFutureTasks(props: OverdueOrFutureTasksProps): JSX.Element {
  const tasksWithADate = props.tasks.filter((item) => item.duedate !== null);
  let filteredTasks;
  let divClassName;
  let title;
  if (props.taskType === "overdue") {
    filteredTasks = tasksWithADate.filter((item) => isOverdue(item));
    divClassName = "overdue-tasks";
    title = "Overdue";
  } else {
    filteredTasks = tasksWithADate.filter((item) => isFutureTask(item));
    divClassName = "future-tasks";
    title = "Future Tasks";
  }
  return (
    <>
      {filteredTasks.length > 0 && (
        <div className={divClassName}>
          <h2>{title}</h2>
          {filteredTasks.map((item) => (
            <ToDoItemCard
              toDoItem={item}
              key={item.id}
              setRefresh={props.setRefresh}
            />
          ))}
        </div>
      )}
    </>
  );
}

interface DailyTaskProps {
  tasks: ToDoProps[];
  desiredDate: string;
  dayDescription: string;
  setRefresh: (input: boolean) => void;
}

function DailyTasks(props: DailyTaskProps): JSX.Element {
  const tasksWithADate = props.tasks.filter((item) => item.duedate !== null);
  const tasksForThatDay = tasksWithADate.filter(
    (item) => item.duedate.slice(0, 10) === props.desiredDate
  );
  return (
    <>
      {tasksForThatDay.length > 0 && (
        <div className="daily-tasks">
          <h2>{props.dayDescription}</h2>
          {tasksForThatDay.map((item) => (
            <ToDoItemCard
              toDoItem={item}
              key={item.id}
              setRefresh={props.setRefresh}
            />
          ))}
        </div>
      )}
    </>
  );
}

interface GeneralTaskProps {
  tasks: ToDoProps[];
  setRefresh: (input: boolean) => void;
}

function GeneralTasks(props: GeneralTaskProps): JSX.Element {
  const tasksWithoutDate = props.tasks.filter((item) => item.duedate === null);
  return (
    <>
      {tasksWithoutDate.length > 0 && (
        <div className="general-tasks">
          <h2>General Tasks</h2>
          {tasksWithoutDate.map((item) => (
            <ToDoItemCard
              toDoItem={item}
              key={item.id}
              setRefresh={props.setRefresh}
            />
          ))}
        </div>
      )}
    </>
  );
}

function getDate(daysFromToday: number): string {
  const someDate = new Date();
  someDate.setDate(someDate.getDate() + daysFromToday);
  const day = someDate.getDate();
  const isSingleDigitDay = day.toString().length === 1;
  const newDate =
    someDate.getFullYear() +
    "-" +
    (someDate.getMonth() + 1) +
    "-" +
    (isSingleDigitDay ? "0" : "") +
    day;
  return newDate;
}

export function CompletedTasks(props: UncompletedTaskProps): JSX.Element {
  return (
    <div className="completed-list">
      {props.toDoItems
        .filter((item) => item.completed)
        .map((item) => (
          <ToDoItemCard
            toDoItem={item}
            key={item.id}
            setRefresh={props.setRefresh}
          />
        ))}
    </div>
  );
}

function isOverdue(task: ToDoProps) {
  const taskDay = parseInt(task.duedate.slice(8, 10));
  const taskMonth = parseInt(task.duedate.slice(5, 7));
  const taskYear = parseInt(task.duedate.slice(0, 4));

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return (
    taskYear < year ||
    (taskYear === year && taskMonth < month) ||
    (taskYear === year && taskMonth === month && taskDay < day)
  );
}

function isFutureTask(task: ToDoProps) {
  const taskDay = parseInt(task.duedate.slice(8, 10));
  const taskMonth = parseInt(task.duedate.slice(5, 7));
  const taskYear = parseInt(task.duedate.slice(0, 4));

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return (
    taskYear > year ||
    (taskYear === year && taskMonth > month) ||
    (taskYear === year && taskMonth === month && taskDay > day + 6)
  );
}
