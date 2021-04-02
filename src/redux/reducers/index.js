import { combineReducers } from "redux";
import kakuro from "./kakuroReducer";
import spiders from "./spidersReducer";

const rootReducer = combineReducers({
  kakuro,
  spiders
});

export default rootReducer;
