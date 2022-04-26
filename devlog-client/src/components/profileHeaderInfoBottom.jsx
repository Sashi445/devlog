import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import serverConfig from './../app/ServerConfig';


const ProfileHeaderInfoBottom = ({ user, devlogUser, accessToken }) => {

    console.log(user, `Inside Profile Header Bottom`)

    const { targetuser } = useParams();

    console.log(targetuser);

    const [follows, setFollows] = useState(false);

    useEffect(() => {
        console.log("Check for follow");

        axios.get(`${serverConfig.proxyUrl}/users/${user}/follows/${targetuser}`).then((res) => {
            setFollows(res.data.follows);
        });

    }, []);

    const followUser = () => {

        console.log("Follow user clicked!!")

        const headers = serverConfig.getHeaders(accessToken);

        axios.put(`${serverConfig.proxyUrl}/users/follow/${targetuser}`, {}, {
            headers : headers
        })
        .then(res => {
            setFollows(res.data.follows);
        }).catch(e => {
            console.error(e.message);
        });

    }

    const unfollowUser = () => {

        console.log("Unfollow user clicked!!")

        const headers = serverConfig.getHeaders(accessToken);

        axios.delete(`${serverConfig.proxyUrl}/users/follow/${targetuser}`, {
            headers : headers
        }).then(res => {
            setFollows(res.data.follows);
        }).catch(e => {
            console.error(e.message);
        })
    }

    const inviteUser = () => {
        // TODO : write code to send an email to invite the user
        console.log("Sending email to target user!!")
    }

    if (!devlogUser) {
        return <div>
            <button className='btn btn-sm btn-outline-success' onClick={() => inviteUser()} >Invite to Devlog!</button>
        </div>
    }

    return (
        <div>
            {
                follows ?
                    <button className='btn btn-outline-danger btn-sm' onClick={() => unfollowUser()}>Unfollow</button> :
                    <button className='btn btn-outline-primary btn-sm' onClick={() => followUser()} >Follow</button>
            }
        </div>
    );

}


const mapStateToProps = (state, props) => ({
    user : state.user.instance.login,
    accessToken : state.user.accessToken,
    devlogUser : props.devlogUser
})

export default  connect(mapStateToProps)(ProfileHeaderInfoBottom);