import { ToDoProps } from "../App";
import { getDate } from "./utils/getDate";
import { ToDoItemCard } from "./todoCard";
import { isFutureTask } from "./utils/isFutureTask";
import { isOverdue } from "./utils/isOverdue";

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
