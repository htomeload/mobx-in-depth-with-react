import RootStore from "../root_store";
import GlobalViewStore from "./global.view";

export default class UiStore {
  globalViewStore: GlobalViewStore;

  constructor(rootStore: RootStore) {
    this.globalViewStore = new GlobalViewStore(rootStore);
  }
}
