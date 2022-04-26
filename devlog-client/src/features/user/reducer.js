import * as actionTypes from "./actionTypes";

const initialState = {
    isLoggedIn : false,
    instance : {
        // login : ""
    },
    accessToken : null
}

// reducer for user
const UserReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_USER : return {...state, isLoggedIn : true, instance : action.payload.user, accessToken : action.payload.accessToken }
        case actionTypes.LOGOUT_USER : return initialState
        default: return state;
    }
}

export default UserReducer