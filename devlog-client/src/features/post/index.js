import * as actionTypes from "./actionTypes";

const initialState = {
    posts : []
}

// reducer function for post
const PostReducer = (state=initialState, action) => {

    switch(action.type) {

        case actionTypes.CREATE_POST :
            return { ...state, posts : [action.payload, ...state.posts] };

        case (actionTypes.LIKE_POST): 
            return { ...state, posts: state.posts.map((post)=>{
                if (post.id === action.payload.id)
                    return action.payload;
                return post;
            })}

        case actionTypes.BOOKMARK_POST: 
            return { ...state, posts: state.posts.map((post) => {
                    if (post.id === action.payload.id)
                        return action.payload;
                    return post;
                })}

        case actionTypes.FETCH_POSTS:
            return { posts: action.payload };

        default : return state;

    }
}

export default PostReducer;