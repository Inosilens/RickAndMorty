import { createStore } from "redux";
import { rootReducer } from "../actions/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware())
);
