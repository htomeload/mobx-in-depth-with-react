import { createContext } from "react";
import RootStore from "../root_store";

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
