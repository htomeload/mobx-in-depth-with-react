import { observer } from "mobx-react-lite";
import React, { useState, FunctionComponent } from "react";
import User from "../model/data/user/user.class";
import { useStore } from "../model/helper/user-store";
import TodoComponent from "./Todo";

interface Props {
  user?: User;
}

const TodoList: FunctionComponent<Props> = ({ user }) => {
  const {
    dataStore: { todoStore },
  } = useStore();

  const [text, setText] = useState("");

  const handleSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  function addTodo() {
    if (text.length < 2) {
      alert("too short");
      return;
    }

    todoStore.addTodo(text, user ? user.id : 0);
    setText("");
  }

  const completedTodos = user ? user.completed : todoStore.completed;
  const inCompleteTodos = user ? user.inComplete : todoStore.inComplete;

  return (
    <div>
      <div className="input-group">
        <input
          className="form-group"
          type="text"
          value={text}
          onChange={handleSetText}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={addTodo}>
            Add Todo
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Incomplete Todos({inCompleteTodos?.length}):
        </div>
        <ul className="list-group">
          {inCompleteTodos?.map((todo) => (
            <TodoComponent key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
      <div className="card">
        <div className="card-header">
          Complete Todos({completedTodos?.length}):
        </div>
        <ul className="list-group">
          {completedTodos?.map((todo) => (
            <TodoComponent key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(TodoList);
