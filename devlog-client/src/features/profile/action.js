import * as actionTypes from './actionType';

// action creator for fecting profile
const fetchProfile = (profileData) => {
    return {
        type: actionTypes.FETCH_PROFILE,
        payload: profileData
    }
}

export default fetchProfile;