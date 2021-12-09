import { useEffect, useState } from "react";
import { CreateToDo } from "./components/CreateToDo";
import { UncompletedTasks, CompletedTasks } from "./components/tasksList";

export interface ToDoProps {
  id: number;
  task: string;
  creationdate: string;
  duedate: string;
  completed: boolean;
}

export const baseURL = "https://cjhtodo.herokuapp.com/";

function App(): JSX.Element {
  const [toDoItems, setToDoItems] = useState<ToDoProps[]>([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchLink = async () => {
      const response = await fetch(baseURL + "items");
      const data = await response.json();
      setToDoItems(data);
      setRefresh(false);
    };
    fetchLink();
  }, [refresh]);
  return (
    <div className="app">
      <CreateToDo setRefresh={setRefresh} />
      <div className="uncompleted-tasks">
        <UncompletedTasks toDoItems={toDoItems} setRefresh={setRefresh} />
        <CreateToDo setRefresh={setRefresh} />
      </div>
      <h2>Completed</h2>
      <CompletedTasks toDoItems={toDoItems} setRefresh={setRefresh} />
    </div>
  );
}

export default App;
