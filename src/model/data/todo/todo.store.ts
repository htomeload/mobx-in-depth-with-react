import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";
import RootStore from "../../root_store";
import Todo from "./todo.class";

export default class TodoStore {
  @observable
  todoList: Todo[];

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);

    this.todoList = [];
    this.rootStore = rootStore;

    reaction(
      () => this.todoList.length,
      () =>
        console.log(
          `Current Todo Count: ${this.todoList.length}, Done Todos: ${this.completed.length}, Incomplete: ${this.inComplete.length}`
        )
    );

    when(
      () =>
        this.todoList.length > 0 &&
        this.todoList.every((todo) => todo.isComplete),
      () => console.log("Amazing Work!")
    );
  }

  getUserTodo(userId: number) {
    return this.todoList.filter((todo) => todo.userId === userId);
  }

  @action
  getTodo(id: number) {
    return this.todoList.find((todo) => todo.id === id);
  }

  @action
  addTodo(name: string, userId: number) {
    this.todoList.push(new Todo(name, userId, this));
  }

  @action
  removeTodo(id: number) {
    const todoToRemove = this.getTodo(id);

    if (todoToRemove) {
      todoToRemove.dispose();

      const todoIndexToRemove = this.todoList.findIndex(
        (todo) => todo.id === id
      );
      this.todoList.splice(todoIndexToRemove, 1);
    }
  }

  @computed
  get completed() {
    return this.todoList.filter((todo) => todo.isComplete);
  }

  @computed
  get inComplete() {
    return this.todoList.filter((todo) => !todo.isComplete);
  }
}
