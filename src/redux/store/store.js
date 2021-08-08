import {createStore} from "redux";
import {rootReducer} from "../reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware} from "redux";


 export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware()))