import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    instance : null,
    accessToken : null,
    isLoggedIn : false,
}

const userSlice = createSlice({
    name : "user",
    initialState : initialState,
    reducers : {
        loginUser : (state, action) => {
            state.instance = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true
        },
        logoutUser : (state) => {
            state.instance = null;
            state.accessToken = null;
            state.isLoggedIn = false;
        }
    }
});

export const { loginUser, logoutUser } = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectUser = (state) => state.user.instance;

export default userSlice.reducer;