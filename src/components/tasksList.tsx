import { ToDoProps } from "../App";
import { ToDoItemCard } from "./todoCard";

interface UncompletedTaskProps {
  toDoItems: ToDoProps[];
}

export function UncompletedTasks(props: UncompletedTaskProps): JSX.Element {
  return (
    <div className="todo-list">
      {props.toDoItems
        .filter((item) => !item.completed)
        .map((item) => (
          <ToDoItemCard toDoItem={item} key={item.id} />
        ))}
    </div>
  );
}
export function CompletedTasks(props: UncompletedTaskProps): JSX.Element {
  return (
    <div className="todo-list">
      {props.toDoItems
        .filter((item) => item.completed)
        .map((item) => (
          <ToDoItemCard toDoItem={item} key={item.id} />
        ))}
    </div>
  );
}
