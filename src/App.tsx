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
    <div className="body">
      <Header />
      <ToDoList toDoItems={toDoItems} />
    </div>
  );
}

function Header(): JSX.Element {
  return (
    <>
      <h1>My To-do List</h1>
    </>
  );
}

interface ToDoItemCardProps {
  toDoItem: ToDoProps;
}

function ToDoItemCard(props: ToDoItemCardProps): JSX.Element {
  return (
    <div className="todo-item">
      <button>Complete</button>
      <span>{props.toDoItem.task}</span>
      <span>{props.toDoItem.creationDate}</span>
      <span>{props.toDoItem.dueDate}</span>
      <button>Edit</button>
      <button>Delete</button>
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
      ;
    </div>
  );
}

export default App;
