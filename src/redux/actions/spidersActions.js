import actionTypes from "./actionTypes";

export function initializeSpidersSuccess(spiders) {
  return { type: actionTypes.INITIALIZE_SPIDERS, spiders };
}

export function updateSpiderSuccess(spider) {
  return { type: actionTypes.UPDATE_SPIDER, spider };
}

export function initializeSpiders(spiders) {
  return function (dispatch) {
    dispatch(initializeSpidersSuccess(spiders));
  };
}

export function updateSpider(spider) {
  return function (dispatch) {
    dispatch(updateSpiderSuccess(spider));
  };
}
