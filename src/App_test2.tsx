import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";
import RootStore from "./model/root_store";
import "./styles.css";

interface iTodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}

class Todo {
  @observable
  public todoList: iTodoItem[] = [];

  @observable
  public totalComplete: number = 0;

  @observable
  public totalIncomplete: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  updateOneItem(index: number, item: iTodoItem) {
    this.todoList[index] = item;

    when(
      () => item.isCompleted,
      () => {
        console.log(`todo ${item.name} was completed`);
      }
    );

    this.updateTotal();
  }

  @computed
  get getAllItems() {
    return observable.array(this.todoList);
  }

  @computed
  get getAllCompleteList() {
    const newList = this.todoList.filter((e, i) => e.isCompleted);
    console.log("complete list: ", JSON.parse(JSON.stringify(newList)));
    return observable.array(newList);
  }

  @computed
  get getAllIncompleteList() {
    const newList = this.todoList.filter((e, i) => !e.isCompleted);
    console.log("Incomplete list: ", JSON.parse(JSON.stringify(newList)));
    return observable.array(newList);
  }

  @action
  updateTotal() {
    this.totalComplete = this.todoList.filter((e, i) => e.isCompleted).length;
    this.totalIncomplete = this.todoList.filter(
      (e, i) => !e.isCompleted
    ).length;
  }

  @action
  addOneItem(todoItem: iTodoItem) {
    this.todoList.push(todoItem);
    this.updateTotal();
  }

  @action
  removeOneItem(index: number) {
    this.todoList = this.todoList.filter((e, i) => i !== index);
    this.updateTotal();
  }
}

const myTodoList = new Todo();

reaction(
  () => myTodoList.getAllItems,
  () => {
    console.log(
      `current status: ${myTodoList.getAllItems.length}, ${myTodoList.totalComplete}, ${myTodoList.totalIncomplete}`
    );
  }
);

const firstItem: iTodoItem = {
  id: 1,
  name: "Complete assignment",
  isCompleted: false,
};

myTodoList.addOneItem(firstItem);

firstItem.isCompleted = true;

myTodoList.updateOneItem(0, firstItem);

const secondItem: iTodoItem = {
  id: 2,
  name: "Complete another assignment",
  isCompleted: false,
};

myTodoList.addOneItem(secondItem);

secondItem.isCompleted = true;

myTodoList.updateOneItem(1, secondItem);

myTodoList.getAllCompleteList;
myTodoList.getAllIncompleteList;

const rootStore = new RootStore();

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
