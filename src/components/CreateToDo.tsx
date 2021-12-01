import { useState } from "react";
import { baseURL } from "../App";

export function CreateToDo(): JSX.Element {
  const [taskInput, setTaskInput] = useState("");
  return (
    <div className="create-todo">
      <input
        className="task-input"
        placeholder="I need to..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)} />
      <button
        className="add-todo-button"
        onClick={() => handleSubmitTodo(taskInput, null, setTaskInput)}
      >
        Add
      </button>
    </div>
  );
}

async function handleSubmitTodo(
  task: string,
  dueDate: string | null,
  setTaskInput: (input: string) => void
) {
  const todoItem = { task: task, dueDate: dueDate };
  await fetch(baseURL + "items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoItem),
  });
  setTaskInput("");
}
