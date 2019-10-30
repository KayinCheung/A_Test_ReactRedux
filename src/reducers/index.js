import { combineReducers } from "redux";
import carousellReducer from "./carousellReducer";
import positionReducer from "./positionReducer/index";
import historyReducer from "./historyReducer";

const rootReducer = combineReducers({
  carousell: carousellReducer,
  position: positionReducer,
  history: historyReducer
});

export default rootReducer;
