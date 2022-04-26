import * as actionTypes from './actionType';

const initialState = {
    profile: null,
}

// reducer function for profile
const ProfileReducer = (state=initialState, action) => {
    // console.log('payload: ',action.payload);
    switch(action.type){
        case actionTypes.FETCH_PROFILE: return {...state, profile: action.payload}
        default: return state;
    }
}

export default ProfileReducer;