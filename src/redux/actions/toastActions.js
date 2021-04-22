import actionsTypes from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export function addToastSuccess(id, timeout, toastType, message) {
  return { type: actionsTypes.ADD_TOAST, id, timeout, toastType, message };
}

export function removeToastSuccess(id) {
  return { type: actionsTypes.REMOVE_TOAST, id };
}

export function addToast(timeout, toastType, message) {
  return function (dispatch) {
    const id = uuidv4();
    dispatch(addToastSuccess(id, timeout, toastType, message));
  };
}

export function removeToast(id) {
  return function (dispatch) {
    dispatch(removeToastSuccess(id));
  };
}
