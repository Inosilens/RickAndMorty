import {combineReducers} from "redux";
import {dataReducer} from "./dataList";
import {paginationReducer} from "./pagination";


export const rootReducer = combineReducers({
   data: dataReducer,
   pagination:paginationReducer
})