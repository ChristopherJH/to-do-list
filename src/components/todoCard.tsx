import { useState } from "react";
import { ToDoProps, baseURL } from "../App";

interface ToDoItemCardProps {
  toDoItem: ToDoProps;
  setRefresh: (input: boolean) => void;
}
export function ToDoItemCard(props: ToDoItemCardProps): JSX.Element {
  const [editting, setEditting] = useState<boolean>(false);
  return (
    <div className="todo-item">
      {!editting && (
        <NormalCard
          toDoItem={props.toDoItem}
          setEditting={setEditting}
          setRefresh={props.setRefresh}
        />
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
  setRefresh: (input: boolean) => void;
}

function NormalCard(props: NormalCardProps): JSX.Element {
  const itemProps = props.toDoItem;
  return (
    <div className="normal-todo">
      <div className="normal-todo-left-content">
        <div
          className="todo-complete"
          id="todo-complete-true"
          onClick={() => handleComplete(itemProps.id, props.setRefresh)}
        >
          {!itemProps.completed && <i className="far fa-check-circle"></i>}
          {itemProps.completed && <i className="fas fa-check-circle"></i>}
        </div>
        <div className="todo-task">
          <p>{itemProps.task}</p>
        </div>
      </div>
      {!itemProps.completed && (
        <div className="normal-todo-right-content">
          <div className="todo-edit" onClick={() => props.setEditting(true)}>
            <i className="far fa-edit"></i>
          </div>
          <div
            className="todo-delete"
            onClick={() => handleDelete(itemProps.id)}
          >
            <i className="fas fa-trash"></i>
          </div>
        </div>
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
      <div className="edit-todo-empty-space"></div>
      <input
        className="task-input"
        placeholder="I need to..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button
        className="save-todo-button"
        onClick={() =>
          handleSaveTodo(itemProps.id, taskInput, null, props.setEditting)
        }
      >
        <i className="fas fa-save"></i>
      </button>
      <button
        className="cancel-todo-button"
        onClick={() => props.setEditting(false)}
      >
        Cancel
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

async function handleComplete(
  id: number,
  setRefresh: (input: boolean) => void
) {
  await fetch(baseURL + "items/" + id.toString() + "/complete", {
    method: "PUT",
  });
  setRefresh(true);
}

async function handleDelete(id: number) {
  await fetch(baseURL + "items/" + id.toString(), { method: "DELETE" });
}
