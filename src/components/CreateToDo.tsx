import { useState } from "react";
import { baseURL } from "../App";

export function CreateToDo(): JSX.Element {
  const [taskInput, setTaskInput] = useState("");
  return (
    <div className="create-todo">
      <div
        className="todo-add"
        onClick={() => handleSubmitTodo(taskInput, null, setTaskInput)}
      >
        <i className="fas fa-plus-circle"></i>
      </div>
      <input
        className="task-input"
        placeholder="Add task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
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
