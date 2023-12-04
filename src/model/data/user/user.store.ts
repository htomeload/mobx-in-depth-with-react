import { action, computed, makeObservable, observable } from "mobx";
import RootStore from "../../root_store";
import User from "./user.class";

export default class UserStore {
  @observable
  users: User[];

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);

    this.users = [];
    this.rootStore = rootStore;
  }

  @action
  addUser(name: string) {
    const newUser = new User(name, this.rootStore);
    this.users.push(newUser);
  }

  getUser(name: string) {
    return this.users.find((user) => user.name === name) as User;
  }

  @action
  removeUser(name: string) {
    const user = this.getUser(name);

    if (user) {
      user.todos.forEach((todo) => todo.remove());

      const userIndexToRemove = this.users.indexOf(user);
      this.users.splice(userIndexToRemove, 1);
    }
  }

  @action
  resetUserStore() {
    this.users = [];
  }
}
