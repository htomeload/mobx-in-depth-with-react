import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";
import TodoStore from "./todo.store";

let runningId = 0;

export default class Todo {
  id: number = runningId++;

  userId: number;

  @observable
  name: string = "";

  @observable
  isComplete: boolean = false;

  private todoStore: TodoStore;

  private disposer: () => void;

  constructor(name: string, userId: number, todoStore: TodoStore) {
    makeObservable(this);

    this.name = name;
    this.userId = userId;
    this.todoStore = todoStore;

    this.disposer = reaction(
      () => this.isComplete,
      () =>
        console.log(
          `Todo: ${this.name}, changed to: ${
            this.isComplete ? "Done" : "Incomplete"
          }`
        )
    );
  }

  remove() {
    this.todoStore.removeTodo(this.id);
  }

  @action
  updateName(name: string) {
    this.name = name;
  }

  @action
  toggleTodo() {
    this.isComplete = !this.isComplete;
  }

  dispose() {
    this.disposer();
  }
}
