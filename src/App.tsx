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

export const baseURL = "https://cjhtodo.herokuapp.com//";

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
      <div className="uncompleted-tasks">
        <UncompletedTasks toDoItems={toDoItems} />
        <CreateToDo />
      </div>
      <h2>Completed</h2>
      <CompletedTasks toDoItems={toDoItems} />
    </>
  );
}

export default App;
