import * as actionTypes from "./actionTypes";

// action creator for login
export const loginUser = (accessToken, user) => ({
    type : actionTypes.LOGIN_USER,
    payload : {
        accessToken,
        user
    }
})

// action creator for logout
export const logoutUser = () => ({
    type : actionTypes.LOGIN_USER
})