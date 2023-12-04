import { action, makeObservable, observable } from "mobx";
import RootStore from "../root_store";

export enum Views {
  Todos = "Todos",
  Users = "Users",
}

export default class GlobalViewStore {
  @observable
  themeColor: string = "blue";

  @observable
  currentView: Views = Views.Todos;

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action
  updateView(view: Views) {
    this.currentView = view;
  }
}
