import { ToDoProps } from "../App";
import { ToDoItemCard } from "./todoCard";

interface UncompletedTaskProps {
  toDoItems: ToDoProps[];
}

// Function that returns lists of uncompleted tasks
export function UncompletedTasks(props: UncompletedTaskProps): JSX.Element {
  const uncompletedItems = props.toDoItems.filter((item) => !item.completed);
    return (
    <div className="todo-list">
      <OverdueTasks tasks={uncompletedItems} />
      <DailyTasks tasks={uncompletedItems} desiredDate={getDate(0)} dayDescription={"Today"} />
      <GeneralTasks tasks={uncompletedItems} />
    </div>
  );
}

interface OverdueTasksProps {
  tasks: ToDoProps[];
}

function OverdueTasks(props: OverdueTasksProps): JSX.Element {
  const tasksWithADate = props.tasks.filter((item) => item.duedate !== null) 
  const overdueTasks = tasksWithADate.filter((item) => isOverdue(item))
  return (
    <div className={"overdue-tasks"}>
      <h2>Overdue</h2>
      {overdueTasks.map((item) => (
        <ToDoItemCard toDoItem={item} key={item.id} />
      ))}
    </div>
  )
}

interface DailyTaskProps {
  tasks: ToDoProps[];
  desiredDate: string;
  dayDescription: string;
}

function DailyTasks(props: DailyTaskProps): JSX.Element {
  const tasksWithADate = props.tasks.filter((item) => item.duedate !== null) 
  const tasksForThatDay = tasksWithADate.filter((item) => item.duedate.slice(0, 10) === props.desiredDate)
  return (
    <div>
      <h2>{props.dayDescription}</h2>
      {tasksForThatDay.map((item) => (
        <ToDoItemCard toDoItem={item} key={item.id} />
      ))}
    </div>
  )
}

interface GeneralTaskProps {
  tasks: ToDoProps[];
}

function GeneralTasks({tasks}: GeneralTaskProps): JSX.Element {
  const tasksWithoutDate = tasks.filter((item) => item.duedate === null)
  return (
    <div className="general-tasks">
      <h2>General Tasks</h2>
      {tasksWithoutDate.map((item) => (
        <ToDoItemCard toDoItem={item} key={item.id} />
      ))}
    </div>
  )
}

function getDate(daysFromToday: number): string {
  const today = new Date();
  const day = today.getDate() + daysFromToday
  const isSingleDigitDay = day.toString().length === 1;
  const todaysDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (isSingleDigitDay && "0") + day;
  return todaysDate
}

export function CompletedTasks(props: UncompletedTaskProps): JSX.Element {
  return (
    <div className="completed-list">
      {props.toDoItems
        .filter((item) => item.completed)
        .map((item) => (
          <ToDoItemCard toDoItem={item} key={item.id} />
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
  return (taskYear < year) || (taskYear === year && taskMonth < month) || (taskYear === year && taskMonth === month && taskDay < day)
}