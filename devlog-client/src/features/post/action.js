import * as actionTypes from "./actionTypes";
import axios  from 'axios';
import serverConfig from './../../app/ServerConfig';

// middleware for creating the post
export const createPostAsync = async (postData, accessToken, user) => {

    const url = serverConfig.proxyUrl;
    
    const headers = serverConfig.getHeaders(accessToken);

    try{

        const response = await axios.post(`${url}/posts/${user}`, postData, {
            headers : headers
        });

        return createPost(response.data);
    
    } catch(e) {

        // TODO Handle create post error

    }

}

// action creator for creating post
const createPost = (postData) => {

    return {
        type : actionTypes.CREATE_POST,
        payload : {
            ...postData 
        }
    }
}

// middleware for liking the post
export const likePostAsync = async (accessToken, user, postId) => {

    const url = serverConfig.proxyUrl;
    
    const headers = serverConfig.getHeaders(accessToken);

    try{

        const response = await axios.post(`${url}/posts/like/${postId}/${user}`, {
            headers : headers
        });

        return likePost(response.data);
    
    } catch(e) {

        // TODO Handle create post error

    }

}

// action creator for liking post
const likePost = (postData) => {
    
    return {
        type: actionTypes.LIKE_POST,
        payload: {
            ...postData
        }
    }
}

// middleware for bookmark
export const bookmarkPostAsync = async (accessToken, user, postId) => {

    const url = serverConfig.proxyUrl;
    
    const headers = serverConfig.getHeaders(accessToken);

    try{

        const response = await axios.post(`${url}/posts/bookmark/${postId}/${user}`, {
            headers : headers
        });

        return bookmarkPost(response.data);
    
    } catch(e) {

        // TODO Handle create post error

    }

}

// action creator for bookmark
const bookmarkPost = (postData) => {
    
    return {
        type: actionTypes.BOOKMARK_POST,
        payload: {
            ...postData
        }
    }
}

// middleware for fetching post
export const fetchPostAsync = async (accessToken, user) => {

    const url = serverConfig.proxyUrl;
    
    const headers = serverConfig.getHeaders(accessToken);

    try{

        const response = await axios.get(`${url}/posts/${user}`, {
            headers : headers
        });

        return fetchPosts(response.data);
    
    } catch(e) {

        // TODO Handle create post error

    }

}

// action creator for fetching post
const fetchPosts = (postData) => {
    
    return {
        type: actionTypes.FETCH_POSTS,
        payload: [
            ...postData
        ]
    }
}
