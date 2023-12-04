import React, { FunctionComponent, useState } from "react";
import Todo from "../model/data/todo/todo.class";

interface Props {
  todo: Todo;
}

const TodoComponent: FunctionComponent<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  function handleSetText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function saveTodo() {
    if (text.length <= 2) {
      alert("too short");
      return;
    }

    todo.updateName(text);
    setIsEditing(false);
    setText("");
  }

  function handleToggletodo() {
    todo.toggleTodo();
  }

  const todoName = isEditing ? (
    <input type="text" value={text} onChange={handleSetText} />
  ) : (
    <span>
      Name: {todo.name}, UserId: {todo.userId}
    </span>
  );

  const editButton = isEditing ? (
    <button className="btn btn-primary float-right" onClick={saveTodo}>
      Save
    </button>
  ) : (
    <button
      className="btn btn-info float-right"
      onClick={() => setIsEditing(true)}
    >
      Edit
    </button>
  );

  const toggleTodo = isEditing ? null : (
    <button className="float-right btn btn-primary" onClick={handleToggletodo}>
      Toggle Todo
    </button>
  );

  const removeButton = isEditing ? null : (
    <button
      className="float-right btn btn-danger"
      onClick={() => todo.remove()}
    >
      Remove
    </button>
  );

  return (
    <li className="list-group-item">
      {todoName}
      {editButton}
      {toggleTodo}
      {removeButton}
    </li>
  );
};

export default TodoComponent;
