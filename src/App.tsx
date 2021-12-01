import { useEffect, useState } from "react";
import { CreateToDo } from "./components/CreateToDo";
import { UncompletedTasks, CompletedTasks } from "./components/tasksList";

export interface ToDoProps {
  id: number;
  task: string;
  creationDate: string;
  dueDate: string;
  completed: boolean;
}

export const baseURL = "http://localhost:4000/";

function App(): JSX.Element {
  const [toDoItems, setToDoItems] = useState<ToDoProps[]>([]);

  useEffect(() => {
    const fetchLink = async () => {
      const response = await fetch(baseURL + "items");
      const data = await response.json();
      setToDoItems(data);
    };
    fetchLink();
  }, [toDoItems]);
  return (
    <>
      <Header />
      <CreateToDo />
      <UncompletedTasks toDoItems={toDoItems} />
      <h2>Completed</h2>
      <CompletedTasks toDoItems={toDoItems} />
    </>
  );
}

function Header(): JSX.Element {
  return (
    <header>
      <h1>My To-do List</h1>
    </header>
  );
}

export default App;
