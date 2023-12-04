import { Observer, useObserver, observer } from "mobx-react-lite";
import React from "react";
import Todo from "./model/data/todo/todo.class";
import TodoStore from "./model/data/todo/todo.store";
import RootStore from "./model/root_store";

const newTodo = new Todo("New Todo", 99, new TodoStore(new RootStore()));

const Test = observer(() => {
  return (
    <div>
      <div>{newTodo.name}</div>
      <button onClick={() => newTodo.updateName("First Name")}>
        First Name
      </button>
      <button onClick={() => newTodo.updateName("Last Name")}>Last Name</button>
    </div>
  );
});

export default Test;
