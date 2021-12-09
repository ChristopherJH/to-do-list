import { ToDoProps } from "../App";
import { ToDoItemCard } from "./todoCard";

interface UncompletedTaskProps {
  toDoItems: ToDoProps[];
}

export function UncompletedTasks(props: UncompletedTaskProps): JSX.Element {
  const uncompletedItems = props.toDoItems.filter((item) => !item.completed);
  const today = new Date();
  const isSingleDigitDay = today.getDate().toString().length === 1;
  const todaysDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (isSingleDigitDay && "0") + today.getDate();
    return (
    <div className="todo-list">
      <DailyTasks tasks={uncompletedItems} desiredDate={todaysDate} dayDescription={"Today"} />
      <GeneralTasks tasks={uncompletedItems} />
    </div>
  );
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

/* UncompletedTasks
->
today tasks
tasks without a date
tomorrow tasks
next 6 days tasks
tasks after this week

*/

// function sortByCreationDate(a: ToDoProps, b: ToDoProps) {
//   if (a.creationdate < b.creationdate) {
//     return -1;
//   } else {
//     return 1;
//   }
// }

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
