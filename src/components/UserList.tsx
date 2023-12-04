import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import User from "../model/data/user/user.class";
import { useStore } from "../model/helper/user-store";
import TodoList from "./TodoList";

const UserList = () => {
  const {
    dataStore: { userStore },
  } = useStore();

  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState(userStore.users?.[0]);

  const handleSetText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSetCurrentUser = (user: User) => {
    setCurrentUser(user);
  };

  function addUser() {
    if (text.length < 2) {
      alert("too short");
      return;
    }

    userStore.addUser(text);
    setCurrentUser(userStore.users[userStore.users.length - 1]);
    setText("");
  }

  return (
    <div className="row">
      <div className="col-sm-4">
        <div className="input-group">
          <input
            className="form-group"
            type="text"
            value={text}
            onChange={handleSetText}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={addUser}>
              Add User
            </button>
          </div>
        </div>
        <ul className="list-group">
          {userStore.users.map((user) => (
            <li
              onClick={() => handleSetCurrentUser(user)}
              className={`list-group-item ${
                currentUser.id === user.id ? "active" : "hover"
              }`}
            >
              <span>{user.name}</span>
              <button
                onClick={() => userStore.removeUser(user.name)}
                className="float-right btn btn-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-sm-8">
        <TodoList user={currentUser} />
      </div>
    </div>
  );
};

export default observer(UserList);
