import store from "../../app/store";
import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "./actionTypes";

const snackBarBtn = (message, type) => {
  store.dispatch(openSnackBar(message, type));
  setTimeout(() => {
    store.dispatch(closeSnackBar());
  }, 3000);
};

// action creators for snackbar

const openSnackBar = (message, type) => {
  return {
    type: OPEN_SNACKBAR,
    payload: {
      message,
      type,
    },
  };
};

const closeSnackBar = () => {
  return {
    type: CLOSE_SNACKBAR,
    payload: {
      message: "",
      type: "",
    },
  };
};

export default snackBarBtn;
