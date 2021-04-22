import initialState from "../reducers/initialState";
import actionTypes from "../actions/actionTypes";

const toastReducer = (state = initialState.toasts, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      const _state = state.map((toast) => toast);
      _state.push({
        id: action.id,
        type: action.toastType,
        timeout: action.timeout,
        message: action.message
      });
      return _state;
    }
    case actionTypes.REMOVE_TOAST: {
      const _state = state.filter((toast) => toast.id !== action.id);
      return _state;
    }
    default: {
      return state;
    }
  }
};

export default toastReducer;
