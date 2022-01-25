import { createStore } from "redux";
import reducers from "../reducers";

let store;
export function configStore() {
  store = createStore(reducers);
  return store;
}
