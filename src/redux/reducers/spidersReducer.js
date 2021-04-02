import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";

export default function spidersReducer(state = initialState.spiders, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SPIDER_POSITION: {
      return state.map((spider) =>
        spider.id === action.spiderId
          ? { spiderId: action.spiderId, x: action.x, y: action.y }
          : spider
      );
    }
    case actionTypes.INITIALIZE_SPIDERS: {
      return action.spiders;
    }
    case actionTypes.UPDATE_SPIDER: {
      return state.map((spider) =>
        spider.id === action.spider.id ? action.spider : spider
      );
    }
    default: {
      return state;
    }
  }
}
