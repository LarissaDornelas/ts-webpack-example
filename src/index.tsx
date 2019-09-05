import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

type FormElem = React.FormEvent<HTMLFormElement>;

interface Itodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Itodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const completeTodo = (index: number): void => {
    const newTodos: Itodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const addTodo = (text: string): void => {
    const newTodo: Itodo[] = [...todos, { text, complete: false }];
    setTodos(newTodo);
  };

  const removeTodo = (index: number): void => {
    const newTodos = [...todos];
    console.log("before", newTodos);
    newTodos.splice(index - 1, 1);
    console.log("after", newTodos);
  };
  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo: Itodo, index: number) => (
          <Fragment key={index}>
            <li style={{ textDecoration: todo.complete ? "line-through" : "" }}>
              {todo.text}
              <button
                style={{ marginLeft: "10px" }}
                type="button"
                onClick={() => completeTodo(index)}
              >
                {todo.complete ? "Incompleted" : "Completed"}
              </button>
              <button
                style={{ marginLeft: "10px" }}
                type="button"
                onClick={() => removeTodo(index)}
              >
                Remove
              </button>
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
