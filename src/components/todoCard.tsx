import { useState } from "react";
import { ToDoProps, baseURL } from "../App";

interface ToDoItemCardProps {
  toDoItem: ToDoProps;
}
export function ToDoItemCard(props: ToDoItemCardProps): JSX.Element {
  const [editting, setEditting] = useState<boolean>(false);
  return (
    <div className="todo-item">
      {!editting && (
        <NormalCard toDoItem={props.toDoItem} setEditting={setEditting} />
      )}
      {editting && (
        <EdittingCard toDoItem={props.toDoItem} setEditting={setEditting} />
      )}
    </div>
  );
}
interface NormalCardProps {
  toDoItem: ToDoProps;
  setEditting: (input: boolean) => void;
}
function NormalCard(props: NormalCardProps): JSX.Element {
  const itemProps = props.toDoItem;
  return (
    <div className="normal-todo">
      <button
        className="todo-complete"
        id="todo-complete-true"
        onClick={() => handleComplete(itemProps.id)}
      ></button>
      <p>{itemProps.task}</p>
      <p>{itemProps.creationDate}</p>
      <p>{itemProps.dueDate}</p>
      {!itemProps.completed && (
        <button className="todo-edit" onClick={() => props.setEditting(true)}>
          Edit
        </button>
      )}
      {!itemProps.completed && (
        <button
          className="todo-delete"
          onClick={() => handleDelete(itemProps.id)}
        >
          X
        </button>
      )}
    </div>
  );
}
interface EdittingCardProps {
  toDoItem: ToDoProps;
  setEditting: (input: boolean) => void;
}
function EdittingCard(props: EdittingCardProps): JSX.Element {
  const itemProps = props.toDoItem;
  const [taskInput, setTaskInput] = useState(itemProps.task);

  return (
    <div className="edit-todo">
      <input
        className="task-input"
        placeholder="I need to..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)} />
      <button
        className="save-todo-button"
        onClick={() => handleSaveTodo(itemProps.id, taskInput, null, props.setEditting)}
      >
        Save
      </button>
    </div>
  );
}

async function handleSaveTodo(
  id: number,
  task: string,
  dueDate: string | null,
  setEditting: (input: boolean) => void
) {
  const todoItem = { task: task, dueDate: dueDate };
  await fetch(baseURL + "items/" + id.toString(), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoItem),
  });
  setEditting(false);
}

async function handleComplete(id: number) {
  await fetch(baseURL + "items/" + id.toString() + "/complete", {
    method: "PUT",
  });
}

async function handleDelete(id: number) {
  await fetch(baseURL + "items/" + id.toString(), { method: "DELETE" });
}
