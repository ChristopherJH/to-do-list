import { useEffect, useState } from "react";

interface ToDoProps {
  id: number;
  task: string;
  creationDate: string;
  dueDate: string;
  completed: boolean;
}

const baseURL = "http://localhost:4000/"

function App(): JSX.Element {
  const [toDoItems, setToDoItems] = useState<ToDoProps[]>([]);

  useEffect(() => {
    const fetchLink = async () => {
      const response = await fetch(baseURL + "items");
      const data = await response.json();
      setToDoItems(data);
    };
    fetchLink();
  }, []);
  console.log(toDoItems);
  return (
    <>
      <Header />
      <ToDoList toDoItems={toDoItems} setToDoItems={setToDoItems}/>
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

interface ToDoItemCardProps {
  toDoItem: ToDoProps;
  setToDoItems: (input: ToDoProps[]) => void;
}

function ToDoItemCard(props: ToDoItemCardProps): JSX.Element {
  const itemProps = props.toDoItem
  return (
    <div className="todo-item">
      {!itemProps.completed && <button className="todo-complete" onClick={() => handleComplete(itemProps.id, props.setToDoItems)}></button>}
      <p>{itemProps.task}</p>
      <p>{itemProps.creationDate}</p>
      <p>{itemProps.dueDate}</p>
      <button className="todo-edit">Edit</button>
      <button className="todo-delete">X</button>
    </div>
  );
}

async function handleComplete(id: number, setToDoItems: (input: ToDoProps[]) => void) {
  console.log('Complete button pressed')
  const response = await fetch(baseURL + "items/" + id.toString() + "/complete", {method: 'PUT'});
  const data = await response.json();
  setToDoItems(data);
  console.log('Complete button processed')
}

interface ToDoListProps {
  toDoItems: ToDoProps[];
  setToDoItems: (input: ToDoProps[]) => void;
}

function ToDoList(props: ToDoListProps): JSX.Element {
  return (
    <div className="todo-list">
      {props.toDoItems.map((item) => (
        <ToDoItemCard toDoItem={item} key={item.id} setToDoItems={props.setToDoItems}/>
      ))}
    </div>
  );
}

export default App;
