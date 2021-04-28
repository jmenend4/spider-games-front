import actionsTypes from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

export function addToastSuccess(toastType, message, timeout = 3000) {
  return {
    type: actionsTypes.ADD_TOAST,
    id: uuidv4(),
    timeout,
    toastType,
    message
  };
}

export function removeToastSuccess(id) {
  return { type: actionsTypes.REMOVE_TOAST, id };
}

export function addToast(timeout, toastType, message) {
  return function (dispatch) {
    dispatch(addToastSuccess(toastType, message, timeout));
  };
}

export function removeToast(id) {
  return function (dispatch) {
    dispatch(removeToastSuccess(id));
  };
}
