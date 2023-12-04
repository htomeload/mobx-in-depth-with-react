import { computed, makeObservable, observable } from "mobx";
import RootStore from "../../root_store";

let runningId = 0;

export default class User {
  id: number = runningId++;

  private readonly rootStore: RootStore;

  @observable
  name: string = "";

  constructor(name: string, rootStore: RootStore) {
    makeObservable(this);

    this.name = name;
    this.rootStore = rootStore;

    this.rootStore.dataStore.todoStore.addTodo("Finish the Course!", this.id);
  }

  @computed
  get todos() {
    return this.rootStore.dataStore.todoStore.getUserTodo(this.id);
  }

  @computed
  get completed() {
    return this.todos.filter((todo) => todo.isComplete);
  }

  @computed
  get inComplete() {
    return this.todos.filter((todo) => !todo.isComplete);
  }
}
