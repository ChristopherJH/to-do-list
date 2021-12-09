import { useState } from "react";
import { baseURL } from "../App";


interface CreateToDoProps {
  setRefresh: (input: boolean) => void;
}

export function CreateToDo(props: CreateToDoProps): JSX.Element {
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  return (
    <div className="create-todo">
      <AddTodo taskInput={taskInput} dueDate={dueDate} setTaskInput={setTaskInput} setShowCalendar={setShowCalendar} setDueDate={setDueDate} setRefresh={props.setRefresh}/>
      <input
        className="task-input"
        placeholder="Add task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <CalendarAndClear taskInput={taskInput} dueDate={dueDate} setTaskInput={setTaskInput} showCalendar={showCalendar}setShowCalendar={setShowCalendar} setDueDate={setDueDate}/>
    </div>
  );
}

interface AddTodoProps {
  taskInput: string;
  dueDate: string;
  setTaskInput: (input: string) => void;
  setShowCalendar: (input: boolean) => void;
  setDueDate: (input: string) => void;
  setRefresh: (input: boolean) => void;
}

function AddTodo(props: AddTodoProps): JSX.Element {
  return (
<div
        className="todo-add"
        onClick={() => handleSubmitTodo(props.taskInput, props.dueDate, props.setTaskInput, props.setShowCalendar, props.setDueDate, props.setRefresh)}
      >
        <i className="fas fa-plus-circle"></i>
      </div>
  )
}

interface CalendarAndClearProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  showCalendar: boolean;
  setShowCalendar:  (input: boolean) => void;
  dueDate: string;
  setDueDate: (input: string) => void;
}

function CalendarAndClear(props: CalendarAndClearProps): JSX.Element {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <div className="create-todo-calendar-and-clear">
{props.taskInput && (
        <>
        {!props.showCalendar && <div
            className="create-todo-show-calendar"
            onClick={() => props.setShowCalendar(true)}
          >
            <i className="far fa-calendar-alt"></i>
          </div>}
          {props.showCalendar && <input
            type="date"
            id="start"
            name="set-due-date"
            className="create-todo-set-date"
            value={props.dueDate}
            min={date}
            max="2028-12-31"
            onChange={(e) => props.setDueDate(e.target.value)}
          />}
          <div className="clear-icon" onClick={() => props.setTaskInput("")}>
            <i className="fas fa-times"></i>
          </div>
        </>
      )}
    </div>
  )
}

async function handleSubmitTodo(
  task: string,
  dueDate: string | undefined | null,
  setTaskInput: (input: string) => void,
  setShowCalendar:  (input: boolean) => void,
  setDueDate: (input: string) => void,
  setRefresh: (input: boolean) => void
) {
  if (dueDate === "") {
    dueDate = null;
  }
  const todoItem = { task: task, dueDate: dueDate };
  await fetch(baseURL + "items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoItem),
  });
  setTaskInput("");
  setShowCalendar(false);
  setDueDate("");
  setRefresh(true);
}
