import { combineReducers } from "redux";
import UserReducer from './../features/user/reducer';
import PostReducer from "../features/post";
import ProfileReducer from "../features/profile/index";
import SnackbarReducer from "../features/snackbar/index";
import DiscussionsReducer from './../features/discussionPages/index';

const rootReducer = combineReducers({
    user : UserReducer,
    posts : PostReducer,
    profile: ProfileReducer,
    snackbar: SnackbarReducer,
    discussions : DiscussionsReducer
})

export default rootReducer;