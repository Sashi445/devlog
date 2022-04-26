import {OPEN_SNACKBAR,CLOSE_SNACKBAR} from "./actionTypes";

const initialState = {
    snackbar: {
        open: false,
        message: '',
        type: '',
    },
};

// reducer for snackbar
const SnackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    open: true,
                    message: action.payload.message,
                    type: action.payload.type,
                },
            };
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    open: false,
                    message: '',
                    type: '',
                },
            };
        default:
            return state;
    }
};

export default SnackbarReducer;