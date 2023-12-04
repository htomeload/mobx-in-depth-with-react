import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore } from "./model/helper/create-store";
import { StoreProvider } from "./model/helper/store-context";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
const rootStore = createStore();

rootStore.dataStore.userStore.addUser("Student 0");
rootStore.dataStore.userStore.addUser("Student 1");
rootStore.dataStore.userStore.addUser("Student 2");

root.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
