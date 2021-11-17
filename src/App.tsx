import React, { useEffect, useState } from "react";

interface ToDoProps {
  id: number;
  task: string;
  creationDate: string;
  dueDate: string;
}

function App(): JSX.Element {
  const [toDoItems, setToDoItems] = useState<ToDoProps[]>([]);

  useEffect(() => {
    const fetchLink = async () => {
      const response = await fetch("http://localhost:4000/items");
      const data = await response.json();
      setToDoItems(data);
    };
    fetchLink();
  }, []);
  console.log(toDoItems);
  return (
    <>
      <Header />
      <ToDoList toDoItems={toDoItems} />
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
}

function ToDoItemCard(props: ToDoItemCardProps): JSX.Element {
  return (
    <div className="todo-item">
      <button className="todo-complete"></button>
      <p>{props.toDoItem.task}</p>
      <p>{props.toDoItem.creationDate}</p>
      <p>{props.toDoItem.dueDate}</p>
      <button className="todo-edit">Edit</button>
      <button className="todo-delete">X</button>
    </div>
  );
}

interface ToDoListProps {
  toDoItems: ToDoProps[];
}

function ToDoList(props: ToDoListProps): JSX.Element {
  return (
    <div className="todo-list">
      {props.toDoItems.map((item) => (
        <ToDoItemCard toDoItem={item} key={item.id} />
      ))}
    </div>
  );
}

export default App;
