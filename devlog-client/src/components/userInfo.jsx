import { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import serverConfig from './../app/ServerConfig';
import { connect } from 'react-redux';
import ProfileHeader from './profileHeader';
import PostView from './PostView';

const UserInfo = ({ user }) => {

    // user exists in devlog 
    // user not exists

    const history = useHistory();

    const { targetuser } = useParams();

    const [ userObject, setUserObject ] = useState(null);

    useEffect(() => {

        if ( user === targetuser) {
            history.replace("/profile");
        } else{

            axios.get(`${serverConfig.proxyUrl}/users/info/${targetuser}`).then(res => {
                setUserObject(res.data);
            })

        }

    }, []);


    if (userObject === null){
        return <div className='container'>
            Loading....
        </div>
    }

    const { avatar, exists, followers, following, username, posts} = userObject;

    return (<div className="container">
        <ProfileHeader devlogUser={exists} avatar={avatar} followers={followers} posts={posts.length} following={following} username={username} />
        <div>
            <hr />
            { posts.map(post => <PostView post={post} key={post.id} />) }
        </div>
    </div>);
}

const mapStateToProps = (state) => ({user: state.user.instance.login})

export default connect(mapStateToProps)(UserInfo);