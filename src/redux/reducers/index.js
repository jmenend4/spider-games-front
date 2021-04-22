import { combineReducers } from "redux";
import kakuro from "./kakuroReducer";
import spiders from "./spidersReducer";
import toasts from "./toastReducer";

const rootReducer = combineReducers({
  kakuro,
  spiders,
  toasts
});

export default rootReducer;
