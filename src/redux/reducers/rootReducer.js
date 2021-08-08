import { combineReducers } from "redux";
import { dataReducer } from "./personList";
import { paginationReducer } from "./pagination";
import { dataFilmsReducer } from "./filmList";

export const rootReducer = combineReducers({
  data: dataReducer,
  pagination: paginationReducer,
  films: dataFilmsReducer,
});
