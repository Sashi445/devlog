import React, {useEffect, useState} from 'react';
import axios from "axios";
import serverConfig from '../app/ServerConfig';
import PostView from './PostView';

const RepoPostsComponent = ({repoRef}) => {

    const [ posts, setPosts ] = useState([]);

    useEffect(() => {

        axios.get(`${serverConfig.proxyUrl}/repos/posts/${repoRef}`, {
            headers : {
                "accept" : "application/json"
            }
        }).then(res => {
            setPosts(res.data);
        }).catch(e => {
            console.log(e.message);
        })

    }, []);

    return (
        <div>{posts.map(post => <PostView key={post._id} post={post} />)}</div>
    );
}
 
export default RepoPostsComponent;